import { NextResponse } from 'next/server';
import { eachDayOfInterval, isWithinInterval } from 'date-fns';
import { format } from 'date-fns';

import getCurrentUser from '@/app/functions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { Stripe } from '@/libs/stripe';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();

    const { listingId, totalPrice, startDate, endDate, source } = body;

    if (!listingId || !totalPrice || !startDate || !endDate) {
      return NextResponse.error();
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId
      },
      include: {
        reservations: true
      }
    })
    if (!listing) {
      throw new Error("No listing found")
    }

    if (listing.userId === currentUser.id) {
      return NextResponse.json({ message: `You can't book your own listing` }, { status: 500 });
    }
    const host = await prisma.user.findUnique({
      where: {
        id: listing.userId
      }
    })

    if (!host) {
      throw new Error('Host not found')
    }

    if (!host.walletId) {
      return NextResponse.json({ message: `The host is not connected with Stripe` }, { status: 500 });
    }

    // Check if the startDate and endDate are already reserved
    const dates = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
    for (const reservation of listing.reservations) {
      const reservationDates = eachDayOfInterval({ start: new Date(reservation.startDate), end: new Date(reservation.endDate) });
      for (const date of dates) {
        if (reservationDates.some(reservationDate => isWithinInterval(date, { start: reservationDate, end: reservationDate }))) {
          return NextResponse.json({ message: `The dates are already reserved` }, { status: 500 });
        }
      }
    }
    await Stripe.charge(totalPrice, source, host.walletId);


    await prisma.user.update({
      where: {
        id: listing.userId
      },
      data: {
        income: { increment: totalPrice }
      }
    })
    const listingAndReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(listingAndReservation);
  } catch (error: any) {
    throw new Error(error)
  }
}
