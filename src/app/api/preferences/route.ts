// pages/api/submit-categories.ts

import { NextResponse } from 'next/server';
import prisma from "@/libs/prismadb";
import getCurrentUser from '@/app/functions/getCurrentUser';

export async function PUT(req: Request) {
    const { categories } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    try {
        // Update the user's preferences in the database
        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: { preferences: categories },
        });

        return NextResponse.json({ message: 'Categories submitted successfully', user });
    } catch (error) {
        console.error('Error submitting categories:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
