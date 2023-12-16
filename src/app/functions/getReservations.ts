import prisma from "@/libs/prismadb";
import { SafeReservation } from "@/types";
import { Listing, User } from "@prisma/client";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { authorId, listingId, userId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: {
          include: {
            images: true,
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...(reservation.listing as Omit<Listing, "createdAt" | "updatedAt">),
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.updatedAt?.toISOString(),
        user: {
          ...(reservation.listing.user as Omit<
            User,
            "createdAt" | "updatedAt"
          >),
          createdAt: reservation.listing.user.createdAt.toISOString(),
          updatedAt: reservation.listing.user.updatedAt.toISOString(),
          emailVerified:
            reservation.listing.user.emailVerified?.toISOString() || null,
          hasWallet: true, // Provide a default value or adjust as needed
          balance: 0, // Provide a default value or adjust as needed
        },
        images: reservation.listing.images, // Include images property
      },
    })) as SafeReservation[];

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
