import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/functions/getCurrentUser';
import prisma from '@/libs/prismadb';

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
    wilayaLocation,
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
      wilayaLocationValue: wilayaLocation.label,
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


export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const body = await request.json();

    const {
      id,
      title,
      description,
      images,
      category,
      roomCount,
      guestCount,
      price,
      bathroomCount,
      location,
      wilayaLocation,
    } = body;

    const listingId = String(id);
    if (!listingId || typeof listingId !== 'string') {
      return NextResponse.json({ message: 'Invalid listing ID' }, { status: 404 });
    }


    const listing = await prisma.listing.update({
      where: {
        id: listingId, // Specify the ID of the listing to update
      },
      data: {
        title,
        description,
        category,
        roomCount,
        guestCount,
        bathroomCount,
        price: parseInt(price, 10),
        locationValue: location.value,
        wilayaLocationValue: wilayaLocation.label,
        images: {
          createMany: {
            data: images,
          },
        },
      },
    });
    
    return NextResponse.json(listing);


  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });

  }
}