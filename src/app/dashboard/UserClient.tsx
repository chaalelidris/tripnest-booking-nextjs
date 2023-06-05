'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeUser } from '../types';

interface UserClientProps {
  currentUser?: SafeUser | null;
}

const UserClient: React.FC<UserClientProps> = ({ currentUser }) => {
  const router = useRouter();

  const onCancel = useCallback(() => {
    axios
      .patch(`/api/stripe`)
      .then(() => {
        toast.success('Stripe disconnected');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
    // .finally(() => {

    // });
  }, [router]);

  const onClick = useCallback(() => {
    axios
      .post(`/api/stripe`)
      .then((response) => {
        router.push(response.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  }, [router]);

  // useEffect(() => {
  //   axios.get('/api/stripe').then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);

  const stripeUrl = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID}&scope=read_write&redirect_uri=http://localhost:3000/user`;
  const additionalDetails = currentUser?.hasWallet ? (
    <>
      {/* <hr /> */}
      <div className='my-6 space-y-4 font-light'>
        <div>
          Income Earned:{' '}
          <span className='font-semibold'>$ {currentUser.income}</span>
        </div>
        <Button
          primary
          label='Disconnect Stripe'
          onClick={onCancel}
        />
        <div className='text-xs text-neutral-500 '>
          By disconnecting, you won&apos;t be able to receive
          <span className='font-semibold'>any further payments</span> . This
          will prevent users from booking listings that you might have already
          created.
        </div>
      </div>
    </>
  ) : (
    <>
      {/* <hr /> */}
      <div className='my-6 space-y-4 font-light'>
        <Button
          primary
          label='Connect with Stripe'
          onClick={onClick}
        />

        <div className='text-xs text-neutral-500 '>
          When redirected to the Stripe account activation form, fill out test information and use a test card or bank account and use a test document.
        </div>
      </div>
    </>
  );
  return (
    <Container>
      <div className='max-w-sm h-full mx-auto border shadow-md px-4 py-3'>
        <div className='flex items center justify-center mb-4'>
          <Avatar src={currentUser?.image} size='lg' />
        </div>
        <hr />
        <div className='my-6'>
          <Heading title='Details' />

          <div className='flex space-y-3 flex-col font-light'>
            <div>
              Name: <span className='font-semibold'>{currentUser?.name}</span>
            </div>
            <div>
              Email: <span className='font-semibold'>{currentUser?.email}</span>
            </div>
          </div>
        </div>
        {currentUser && (
          <>
            <hr />
            <div className='my-6 space-y-4 font-light'>
              <Heading
                title='Additional Details'
              // subtitle='Interested in becoming a Groundbnb host? Register with your Stripe account!'
              />

              {additionalDetails}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default UserClient;
