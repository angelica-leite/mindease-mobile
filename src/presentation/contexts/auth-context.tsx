import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type AuthProviderType = 'email';

interface StoredUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly provider: AuthProviderType;
  readonly createdAt: string;
  readonly password?: string;
}

export interface AuthProfile {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly provider: AuthProviderType;
  readonly createdAt: string;
}

interface AuthSession {
  readonly profile: AuthProfile;
  readonly signedInAt: string;
}

interface RegisterInput {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

interface LoginInput {
  readonly email: string;
  readonly password: string;
}

interface AuthResult {
  readonly ok: boolean;
  readonly error?: string;
}

interface AuthContextValue {
  readonly profile: AuthProfile | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  register(input: RegisterInput): Promise<AuthResult>;
  login(input: LoginInput): Promise<AuthResult>;
  logout(): Promise<void>;
}

const USERS_STORAGE_KEY = 'mindease-auth-users';
const SESSION_STORAGE_KEY = 'mindease-auth-session';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getSafeUuid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function readUsers() {
  const raw = await AsyncStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) {
    return [] as StoredUser[];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [] as StoredUser[];
    }

    return parsed as StoredUser[];
  } catch {
    return [] as StoredUser[];
  }
}

async function writeUsers(users: readonly StoredUser[]) {
  await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

async function readSession() {
  const raw = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.profile?.email) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

async function writeSession(session: AuthSession | null) {
  if (!session) {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }

  await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function extractProfile(user: StoredUser): AuthProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    createdAt: user.createdAt,
  };
}

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [storedUsers, storedSession] = await Promise.all([readUsers(), readSession()]);
        if (cancelled) {
          return;
        }

        setUsers(storedUsers);
        setSession(storedSession);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const startSession = useCallback(async (user: StoredUser) => {
    const profile = extractProfile(user);
    const nextSession: AuthSession = {
      profile,
      signedInAt: new Date().toISOString(),
    };

    setSession(nextSession);
    await writeSession(nextSession);
  }, []);

  const register = useCallback(
    async (input: RegisterInput): Promise<AuthResult> => {
      const name = input.name.trim();
      const email = normalizeEmail(input.email);
      const password = input.password;

      if (name.length < 2) {
        return { ok: false, error: 'Informe um nome com pelo menos 2 caracteres.' };
      }
      if (!EMAIL_REGEX.test(email)) {
        return { ok: false, error: 'Informe um e-mail válido.' };
      }
      if (password.length < 6) {
        return { ok: false, error: 'A senha deve ter pelo menos 6 caracteres.' };
      }

      if (users.some((user) => user.email === email)) {
        return { ok: false, error: 'Este e-mail já está cadastrado.' };
      }

      const now = new Date().toISOString();
      const nextUser: StoredUser = {
        id: getSafeUuid(),
        name,
        email,
        password,
        provider: 'email',
        createdAt: now,
      };

      const nextUsers = [...users, nextUser];
      setUsers(nextUsers);
      await writeUsers(nextUsers);
      await startSession(nextUser);

      return { ok: true };
    },
    [startSession, users],
  );

  const login = useCallback(
    async (input: LoginInput): Promise<AuthResult> => {
      const email = normalizeEmail(input.email);
      const user = users.find((candidate) => candidate.email === email);

      if (!user) {
        return { ok: false, error: 'Usuário não encontrado.' };
      }

      if (user.password !== input.password) {
        return { ok: false, error: 'Senha inválida.' };
      }

      await startSession(user);
      return { ok: true };
    },
    [startSession, users],
  );

  const logout = useCallback(async () => {
    setSession(null);
    await writeSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      profile: session?.profile ?? null,
      isAuthenticated: Boolean(session?.profile),
      isLoading,
      register,
      login,
      logout,
    }),
    [isLoading, login, logout, register, session?.profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
}
