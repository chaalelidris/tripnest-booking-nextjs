import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';
import { Stripe } from '../libs/stripe';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;

    let balance = 0;


    if (currentUser.walletId) {
      balance = await Stripe.balance(currentUser.walletId)
    }


    return {
      ...currentUser,
      hasWallet: currentUser.walletId ? true : false,
      walletId: undefined,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
      balance

    };
  } catch (error: any) {
    return null;
  }
}
