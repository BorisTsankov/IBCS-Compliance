import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { apiRequest, type ApiEnvelope } from "@/lib/api";

type CurrentUser = {
  id: string;
  username: string;
  email: string;
  created_at: string;
};

type UserContextValue = {
  user: CurrentUser | null;
  pending: boolean;
  authenticated: boolean;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setPending(false);
        return;
      }

      try {
        const response = await apiRequest<ApiEnvelope<CurrentUser>>("/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch {
        localStorage.removeItem("auth_token");
        setUser(null);
      } finally {
        setPending(false);
      }
    };

    void fetchCurrentUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      pending,
      authenticated: Boolean(user),
      logout,
    }),
    [user, pending],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};