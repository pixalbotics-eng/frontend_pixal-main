'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usersApi } from '@/api/users';
import type { User } from '@/api/auth';
import type { CreateUserData, UpdateUserData } from '@/api/users';
import { getErrorMessage } from '@/api/client';

export interface UsersContextType {
  users: User[];
  loading: boolean;
  refetch: () => Promise<void>;
  createUser: (data: CreateUserData) => Promise<void>;
  updateUser: (id: string, data: UpdateUserData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  deletingId: string | null;
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
  token: string | null;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

export function UsersProvider({ children, token, onError, onSuccess }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fetchInFlightRef = useRef(false);
  const hasFetchedRef = useRef(false);

  const refetch = useCallback(async () => {
    if (!token) return;
    if (fetchInFlightRef.current) return;
    fetchInFlightRef.current = true;
    setLoading(true);
    try {
      const response = await usersApi.getAll(token);
      if (response.success && response.data?.users) {
        setUsers(response.data.users);
      }
    } catch (err) {
      onError(getErrorMessage(err));
    } finally {
      setLoading(false);
      fetchInFlightRef.current = false;
    }
  }, [token, onError]);

  useEffect(() => {
    if (!token) return;
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    void refetch();
  }, [token, refetch]);

  const createUser = useCallback(
    async (data: CreateUserData) => {
      if (!token) return;
      const res = await usersApi.create(data, token);
      onSuccess(res.message || 'User created successfully.');
      await refetch();
    },
    [token, refetch, onSuccess]
  );

  const updateUser = useCallback(
    async (id: string, data: UpdateUserData) => {
      if (!token) return;
      const res = await usersApi.update(id, data, token);
      onSuccess(res.message || 'User updated successfully.');
      await refetch();
    },
    [token, refetch, onSuccess]
  );

  const deleteUser = useCallback(
    async (id: string) => {
      if (!token) return;
      setDeletingId(id);
      try {
        const res = await usersApi.delete(id, token);
        onSuccess(res.message || 'User deleted successfully.');
        await refetch();
      } catch (err) {
        onError(getErrorMessage(err));
      } finally {
        setDeletingId(null);
      }
    },
    [token, refetch, onSuccess, onError]
  );

  const value: UsersContextType = {
    users,
    loading,
    refetch,
    createUser,
    updateUser,
    deleteUser,
    deletingId,
  };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}
