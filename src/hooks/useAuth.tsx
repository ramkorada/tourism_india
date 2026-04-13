import { useState, useEffect, createContext, useContext } from "react";
import { apiFetch, getToken, setToken, clearToken, parseToken } from "@/lib/apiClient";

interface AppUser {
  id: string;
  email: string;
  display_name?: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore session from stored JWT
  useEffect(() => {
    const token = getToken();
    if (token) {
      const payload = parseToken(token);
      if (payload && payload.exp && payload.exp * 1000 > Date.now()) {
        setUser({
          id: payload.sub,
          email: payload.email,
          display_name: payload.display_name,
        });
      } else {
        clearToken();
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await apiFetch<{ token: string; user: AppUser }>(
      "/auth/signup",
      {
        method: "POST",
        body: JSON.stringify({ email, password, display_name: displayName }),
      }
    );
    if (error) return { error: { message: error } };
    if (data?.token) {
      setToken(data.token);
      setUser(data.user);
    }
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await apiFetch<{ token: string; user: AppUser }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    if (error) return { error: { message: error } };
    if (data?.token) {
      setToken(data.token);
      setUser(data.user);
    }
    return { error: null };
  };

  const signOut = async () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
