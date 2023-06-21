'use client';
import { useEffect } from 'react';
import EmptyState from '@/app/components/EmptyState';

interface ErrorStateProps {
  error: Error;
}

const Error: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title='Oops!' subtitle='Something went wrong:(' />;
};

export default Error;
