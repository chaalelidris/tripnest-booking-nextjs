import prisma from '@/libs/prismadb';
import { SafePreferences } from '@/types';
import { Listing } from '@prisma/client';
import { NextResponse } from 'next/server';

interface User {
    id: string;
    preferences: SafePreferences | null;
    favoriteIds: string[];
}

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                preferences: true,
                favoriteIds: true,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                preferences: true,
                favoriteIds: true,
            },
        });

        const items = await prisma.listing.findMany({
            include: {
                images: true,
            },
        });

        // Calculate user-user similarity using cosine similarity
        const userSimilarities = calculateUserSimilarities(users, items);


        // Get similar users based on cosine similarity | sorted array with similar users ids[...]
        const similarUsers = findSimilarUsers(user.id, userSimilarities);

        // Get items liked by similar users and not liked by the target user
        const recommendedItems = await findRecommendedItems(user, similarUsers, items);

        const safeRecommendedItems = recommendedItems.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            updatedAt: listing.updatedAt?.toISOString(),
        }));

        return NextResponse.json({ recommendations: safeRecommendedItems });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

type CosineSimilarityMatrix = Record<string, number[]>;

function calculateUserSimilarities(users: User[], items: Listing[]): CosineSimilarityMatrix {
    const userSimilarities: CosineSimilarityMatrix = {};

    for (const user of users) {
        const userPreferences = user.preferences;
        const userVector = getUserVector(userPreferences, items);
        userSimilarities[user.id] = [];

        for (const otherUser of users) {
            const otherUserPreferences = otherUser.preferences;
            const otherUserVector = getUserVector(otherUserPreferences, items);
            const similarity = calculateCosineSimilarity(userVector, otherUserVector);
            userSimilarities[user.id].push(similarity);

        }

    }

    return userSimilarities;
}


function getUserVector(preferences: SafePreferences | null, items: Listing[]): number[] {
    const userVector: number[] = [];

    for (const item of items) {
        if (
            preferences?.categories.includes(item.category) &&
            preferences?.location === item.wilayaLocationValue
        ) {
            userVector.push(1);
        } else {
            userVector.push(0);
        }
    }

    return userVector;
}

function calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number {
    const dotProduct = vectorA.reduce(
        (acc, value, index) => acc + value * vectorB[index],
        0
    );
    const magnitudeA = Math.sqrt(vectorA.reduce((acc, value) => acc + value * value, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((acc, value) => acc + value * value, 0));

    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
}

function findSimilarUsers(userId: string, userSimilarities: CosineSimilarityMatrix): string[] {
    const userSimilaritiesArray = Object.entries(userSimilarities);
  
    const targetUserSimilarities = userSimilaritiesArray.find(([id]) => id === userId);
  
    if (!targetUserSimilarities) {
      return [];
    }
  
    const targetUserIndex = userSimilaritiesArray.indexOf(targetUserSimilarities);
    const targetUserSimilarityScores = targetUserSimilarities[1] as number[];
    const similarUsers: string[] = [];
  
    // Create an array of objects with user ID and similarity score
    const usersWithScores = userSimilaritiesArray.map(([id, similarityScores], index) => ({
      id,
      similarityScore: similarityScores[targetUserIndex],
      index,
    }));
  
    // Sort the array based on similarity score in descending order
    usersWithScores.sort((a, b) => b.similarityScore - a.similarityScore);
  
    // Extract the user IDs in the sorted order
    for (const user of usersWithScores) {
      if (user.index !== targetUserIndex && user.similarityScore > 0) {
        similarUsers.push(user.id);
      }
    }
  
  
    return similarUsers;
  }
  

async function findRecommendedItems(
    user: User,
    similarUsers: string[],
    items: Listing[]
): Promise<Listing[]> {
    const userFavorites = new Set(user.favoriteIds);
    const recommendedItems: Listing[] = [];
    const users = await prisma.user.findMany();

    for (const similarUser of similarUsers) {
        const similarUserFavorites = new Set(
            users.find((user) => user.id === similarUser)?.favoriteIds || []
        );

        for (const item of items) {
            if (similarUserFavorites.has(item.id) && !userFavorites.has(item.id)) {
                recommendedItems.push(item);
            }
        }
    }

    return recommendedItems;
}


