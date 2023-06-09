'use client';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';

import { SafeReservation, SafeUser } from '../../types';
import ListingCard from '@/app/components/listings/ListingCard';

type TripsClientProps = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );
  return (
    <Container>
      <div className='mt-6'>
        <Heading
          title='Trips'
          subtitle="Where you've been and where you're going"
        />
      </div>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            data={reservation.listing}
            actionId={reservation.id}
            onAction={onCancel}
            reservation={reservation}
            key={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default TripsClient;
