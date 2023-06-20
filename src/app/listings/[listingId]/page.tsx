import getCurrentUser from '@/app/functions/getCurrentUser';
import getListingById from '@/app/functions/getListingById';
import getReservations from '@/app/functions/getReservations';

import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';
import { Metadata } from 'next';

interface IParams {
  listingId?: string;
}



export async function generateMetadata({ params }: { params: IParams }): Promise<Metadata> {
  const listing = await getListingById(params);

  return {
    title: listing?.title,
    description: listing?.description,
  }
}


const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params)

  if (!listing) {
    return <EmptyState />;
  }
  return <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />;
};

export default ListingPage;
