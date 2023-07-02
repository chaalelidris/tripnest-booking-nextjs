import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/functions/getCurrentUser';

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {  currentPassword, newPassword } = body;

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const hashedPassword = currentUser.hashedPassword; // Can be string or null

    if (!hashedPassword) {
      return NextResponse.json({ message: 'User password is not set' }, { status: 400 });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, hashedPassword);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid current password' }, { status: 401 });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        hashedPassword: newHashedPassword,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    throw new Error(error);
  }
}
