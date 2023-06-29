// pages/api/submit-categories.ts

import { NextResponse } from 'next/server';
import prisma from "@/libs/prismadb";
import getCurrentUser from '@/app/functions/getCurrentUser';
import getCurrentUserPreferences from '@/app/functions/getCurrentUserPreferences';

export async function PUT(req: Request) {
    const { categories, wilayaLocation } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const currentUserPreferences = await getCurrentUserPreferences();

    try {
        // Check if the user already has preferences
        if (currentUserPreferences) {
            // Update the existing preferences
            const updatedPreferences = await prisma.preference.update({
                where: {
                    id: currentUserPreferences.id
                },
                data: {
                    categories,
                    location: wilayaLocation ? wilayaLocation.label : null
                },
            });
            return NextResponse.json({ message: 'Preferences updated successfully', preferences: updatedPreferences });
        } else {
            // Create new preferences for the user
            const createdPreferences = await prisma.preference.create({
                data: {
                    categories,
                    location: wilayaLocation ? wilayaLocation.label : null,
                    user: { connect: { id: currentUser.id } }, // Connect the preferences to the user
                },
            });
            return NextResponse.json({ message: 'Preferences created successfully', preferences: createdPreferences });
        }

    } catch (error) {
        console.error('Error submitting categories:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
