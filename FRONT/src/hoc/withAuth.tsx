import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from '@/models/contexts/AppContext';
import Spinner from '../components/Atoms/Spinner';

export function withAuth(WrappedComponent: any) {
  const WithAuthComponent = (props: any) => {
    const router = useRouter();
    const { userId, isLoadingUser, setIsLoadingUser } = useApp();

    useEffect(() => {
      if (!userId) {
        router.replace('/login');
      } else {
        setIsLoadingUser(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, router]);

    if (isLoadingUser) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  WithAuthComponent.suppressHydrationWarning = true;
  return WithAuthComponent;
}