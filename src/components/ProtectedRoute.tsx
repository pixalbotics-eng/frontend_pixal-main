'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import TopLoadingBar from '@/components/ui/TopLoadingBar';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/admin/login');
        return;
      }
      if (requireAdmin && !isAdmin) {
        router.push('/admin/login');
        return;
      }
    }
  }, [isAuthenticated, isAdmin, loading, router, requireAdmin]);

  if (loading) {
    return (
      <>
        <TopLoadingBar loading={true} />
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent" />
            <p className="mt-3 text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}

