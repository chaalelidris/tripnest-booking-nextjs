import getCurrentUser from '@/app/functions/getCurrentUser';
import getListingById from '@/app/functions/getListingById';
import getReservations from '@/app/functions/getReservations';

import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

export const metadata = {
  title: 'Listing | Tripnest ',
  description: `Tripnest booking listing `,
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
