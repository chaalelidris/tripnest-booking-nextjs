import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    const userEmail = await prisma.user.findFirst({
      where: { email }
    })
    if (userEmail) {
      return NextResponse.json({ message: 'Email already taken by another user' }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    throw new Error(error)
  }
}
