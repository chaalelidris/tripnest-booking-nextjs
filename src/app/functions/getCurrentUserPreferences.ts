import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/libs/prismadb';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUserPreferences() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUserPreferences = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        preferences: true, // Include the preferences relationship
      },
    });

    if (!currentUserPreferences) return null;

    return currentUserPreferences.preferences;
  } catch (error) {
    return null;
  }
}
