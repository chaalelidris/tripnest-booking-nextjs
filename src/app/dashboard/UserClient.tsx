'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Avatar from '@/app/components/Avatar';
import Button from '@/app/components/Button';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import { SafeUser } from '../../types';
import { FaBalanceScaleRight } from 'react-icons/fa';

interface UserClientProps {
  currentUser?: SafeUser | null;
}

const UserClient: React.FC<UserClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false)

  const onCancel = useCallback(() => {
    setisLoading(true);
    axios
      .patch(`/api/stripe`)
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setisLoading(false);
        toast.success('Stripe disconnected');
      });
  }, [router]);

  const stripeUrl = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID}&scope=read_write&redirect_uri=http://localhost:3000/dashboard`;

  const onClick = useCallback(() => {
    setisLoading(true);

    axios
      .post(`/api/stripe`)
      .then((response) => {
        toast.success("Connected with stripe")
        router.push(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
        console.log(error?.response?.data?.error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, [router]);

  /* useEffect(() => {
    axios.get('/api/stripe').then((response) => {
      console.log(response.data);
    });
  }, []); */

  const additionalDetails = currentUser?.hasWallet ? (
    <>
      {/* <hr /> */}
      <div className='my-6 space-y-4 font-light'>
        <div>
          Income Earned:{' '}
          <span className='font-semibold'>$ {currentUser.income}</span>
        </div>
        <Button
          disabled={isLoading}
          loading={isLoading}
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
      <div className='my-6 space-y-4 font-light'>
        <Button
          disabled={isLoading}
          loading={isLoading}
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
      <div className='max-w-sm h-full mx-auto border shadow-md px-4 py-3 mt-6 rounded-2xl'>
        <div className='flex items center justify-center mb-4'>
          <Avatar src={currentUser?.image} size={80} />
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
            <div>
              EmailVerified: <span className='font-semibold'>{currentUser?.emailVerified}</span>
            </div>
          </div>
        </div>
        {currentUser && (
          <>
            <hr />
            <div className='my-6 space-y-4 font-light'>
              <Heading
                title='Additional Details'
                subtitle='Interested in becoming host? Register with your Stripe account!'
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
