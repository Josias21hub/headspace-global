"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  isLoading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Para desenvolvimento, usar usuário demo
    // Em produção, isso seria substituído por autenticação real
    const demoUserId = '00000000-0000-0000-0000-000000000001';
    setUserId(demoUserId);
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
