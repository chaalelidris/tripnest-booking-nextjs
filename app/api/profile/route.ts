import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';


export async function PUT(req: Request) {

  const { id, age, phonenumber, bio, address } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Missing required data" });
  }

  try {
    const updatedProfile = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        age: Number(age),
        address: address,
        phonenumber: phonenumber,
        bio: bio
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json({ message: `error ${error}` });
  }
}
