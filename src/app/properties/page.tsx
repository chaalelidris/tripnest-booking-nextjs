import EmptyState from '../components/EmptyState';

import getCurrentUser from '../functions/getCurrentUser';
import getReservations from '../functions/getReservations';
import PropertiesClient from './PropertiesClient';
import getListings from '../functions/getListings';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />;
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No properties found'
        subtitle='Looks like you have no b**es.'
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
