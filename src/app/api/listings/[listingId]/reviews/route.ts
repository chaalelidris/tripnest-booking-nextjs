import getCurrentUser from '@/app/functions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
    listingId?: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return NextResponse.error();

        const body = await request.json();

        const { rating, comment } = body

        const { listingId } = params;
        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid ID');
        }

        const review = await prisma.review.create({
            data: {
                userId: currentUser.id,
                listingId,
                rating,
                comment,
            },
            include: {
                user: true,
            },
        });
        return NextResponse.json(review)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
        throw new Error("Error submitting review");
    }
}


export async function GET(request: Request, { params }: { params: IParams }) {
    try {
        const { listingId } = params;
        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid ID');
        }

        const reviews = await prisma.review.findMany({
            where: {
                listingId,
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
        throw new Error("Error retrieving reviews");
    }
}
