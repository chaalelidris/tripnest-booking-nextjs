import { NextResponse } from "next/server";
import getCurrentUser from "@/app/functions/getCurrentUser";
import prisma from "@/libs/prismadb";


interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
      return NextResponse.json({ message: 'Invalid listing ID' }, { status: 404 });
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id
      }
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



