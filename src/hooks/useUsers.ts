'use client';

import { useMemo } from 'react';
import { useContext } from 'react';
import { UsersContext } from '@/contexts/UsersContext';
import { useAuth } from '@/hooks/useAuth';

/**
 * Use users data and actions. Prefer this over calling users API directly.
 * - Excludes the current logged-in user from the list.
 * - Single source of truth; no duplicate fetches when used within UsersProvider.
 */
export function useUsers() {
  const auth = useAuth();
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }

  const usersExcludingSelf = useMemo(() => {
    if (!auth.user?._id) return context.users;
    return context.users.filter((u) => u._id !== auth.user!._id);
  }, [context.users, auth.user]);

  return {
    ...context,
    users: usersExcludingSelf,
  };
}
