import { NextResponse } from "next/server";
import { eachDayOfInterval, isWithinInterval } from "date-fns";

import getCurrentUser from "@/app/functions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const body = await request.json();

    const { listingId, totalPrice, startDate, endDate } = body;

    if (!listingId || !totalPrice || !startDate || !endDate) {
      return NextResponse.json({
        message: "Please provide all reservation infos",
        status: 400,
      });
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        reservations: true,
      },
    });

    if (!listing) {
      return NextResponse.json(
        { message: `No listing found` },
        { status: 404 }
      );
    }

    if (listing.userId === currentUser.id) {
      return NextResponse.json(
        { message: `You can't book your own listing` },
        { status: 500 }
      );
    }

    const host = await prisma.user.findUnique({
      where: {
        id: listing.userId,
      },
    });

    if (!host) {
      return NextResponse.json({ message: `Host not found` }, { status: 500 });
    }

    /* if (!host.walletId) {
      return NextResponse.json(
        { message: `The host is not connected with Stripe` },
        { status: 500 }
      );
    } */

    // Check if the startDate and endDate are already reserved
    const dates = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });

    for (const reservation of listing.reservations) {
      const reservationDates = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      for (const date of dates) {
        if (
          reservationDates.some((reservationDate) =>
            isWithinInterval(date, {
              start: reservationDate,
              end: reservationDate,
            })
          )
        ) {
          return NextResponse.json(
            { message: `The dates are already reserved` },
            { status: 400 }
          );
        }
      }
    }

    await prisma.user.update({
      where: {
        id: listing.userId,
      },
      data: {
        income: { increment: totalPrice },
      },
    });

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
    console.error(error);
  }
}
