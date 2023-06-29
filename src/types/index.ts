import { User, Prisma, Reservation, Review, Preference } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified' | 'walletId'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  hasWallet: boolean
  balance: number | null;
};

export type SafePreferences = Preference;


export type SafeReview = Omit<Review,
  'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
    user: SafeUser;
  };

type ListingWithImages = Prisma.ListingGetPayload<{
  include: { images: true | Prisma.ImageFindManyArgs };
}>;

export type SafeListing = Omit<ListingWithImages, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};