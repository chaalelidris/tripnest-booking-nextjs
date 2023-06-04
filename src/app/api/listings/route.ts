import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const {
    title,
    description,
    images,
    category,
    roomCount,
    guestCount,
    price,
    bathroomCount,
    location,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      price: parseInt(price, 10),
      locationValue: location.value,
      userId: currentUser.id,
      images: {
        createMany: {
          data: images,
        },
      },
    },
  });

  return NextResponse.json(listing);
}
