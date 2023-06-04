import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listing'
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
