import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';

import UserClient from './UserClient';

const DashboardPage = async () => {
  //   const router = useRouter();
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />;
  }
  // const reservations = await getReservations({ userId: currentUser.id });

  // if (reservations.length === 0) {
  //   return (
  //     <EmptyState
  //       title='No trips found'
  //       subtitle='Looks like you havent reserved any trips.'
  //     />
  //   );
  // }

  return <UserClient currentUser={currentUser} />;
};

export default DashboardPage;
