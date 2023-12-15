import prisma from "@/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
      include: { images: true, user: true },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
      updatedAt: favorite.updatedAt.toISOString(),
      user: {
        ...favorite.user,
        createdAt: favorite.user.createdAt.toISOString(),
        updatedAt: favorite.user.updatedAt.toISOString(),
        emailVerified: favorite.user.emailVerified?.toISOString() || null,
      },
    }));
    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
