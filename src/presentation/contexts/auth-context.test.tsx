import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { type PropsWithChildren } from 'react';

import { AuthProvider, useAuthContext } from '@/src/presentation/contexts/auth-context';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockedStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

const USERS_STORAGE_KEY = 'mindease-auth-users';
const SESSION_STORAGE_KEY = 'mindease-auth-session';

describe('AuthProvider', () => {
  function wrapper({ children }: PropsWithChildren) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  beforeEach(() => {
    jest.clearAllMocks();
    mockedStorage.getItem.mockResolvedValue(null);
    mockedStorage.setItem.mockResolvedValue();
    mockedStorage.removeItem.mockResolvedValue();
  });

  it('registers and starts a session', async () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      const response = await result.current.register({
        name: 'Ana',
        email: 'ana@example.com',
        password: '123456',
      });

      expect(response.ok).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.profile?.email).toBe('ana@example.com');
    expect(mockedStorage.setItem).toHaveBeenCalledWith(
      USERS_STORAGE_KEY,
      expect.stringContaining('ana@example.com'),
    );
    expect(mockedStorage.setItem).toHaveBeenCalledWith(
      SESSION_STORAGE_KEY,
      expect.stringContaining('ana@example.com'),
    );
  });

  it('rejects duplicated e-mail register', async () => {
    mockedStorage.getItem.mockImplementation(async (key: string) => {
      if (key === USERS_STORAGE_KEY) {
        return JSON.stringify([
          {
            id: '1',
            name: 'Ana',
            email: 'ana@example.com',
            password: '123456',
            provider: 'email',
            createdAt: '2026-01-01T00:00:00.000Z',
          },
        ]);
      }

      return null;
    });

    const { result } = renderHook(() => useAuthContext(), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      const response = await result.current.register({
        name: 'Ana',
        email: 'ana@example.com',
        password: '123456',
      });

      expect(response.ok).toBe(false);
      expect(response.error).toContain('cadastrado');
    });
  });

  it('logs in and logs out', async () => {
    mockedStorage.getItem.mockImplementation(async (key: string) => {
      if (key === USERS_STORAGE_KEY) {
        return JSON.stringify([
          {
            id: '1',
            name: 'Carlos',
            email: 'carlos@example.com',
            password: 'abcdef',
            provider: 'email',
            createdAt: '2026-02-01T00:00:00.000Z',
          },
        ]);
      }

      return null;
    });

    const { result } = renderHook(() => useAuthContext(), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      const response = await result.current.login({
        email: 'carlos@example.com',
        password: 'abcdef',
      });

      expect(response.ok).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(mockedStorage.removeItem).toHaveBeenCalledWith(SESSION_STORAGE_KEY);
  });
});
