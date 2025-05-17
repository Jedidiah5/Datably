"use client";

import type { User } from '@/types';
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { mockLogin, mockRegister, mockLogout } from '@/lib/auth';
import { INACTIVITY_TIMEOUT_MS, LOCAL_STORAGE_USER_KEY, LOCAL_STORAGE_KEEP_LOGGED_IN_KEY } from '@/lib/constants';
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  keepLoggedIn: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (fullName: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
  setKeepLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let inactivityTimer: NodeJS.Timeout | null = null;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [keepLoggedIn, setKeepLoggedInState] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    if (user && !keepLoggedIn) {
      inactivityTimer = setTimeout(() => {
        toast({
          title: "Session Expired",
          description: "You have been logged out due to inactivity.",
          variant: "destructive",
        });
        logout();
      }, INACTIVITY_TIMEOUT_MS);
    }
  }, [user, keepLoggedIn, toast]); // Added toast to dependencies

  const logout = useCallback(async () => {
    await mockLogout();
    setUser(null);
    setKeepLoggedInState(false); // Reset keepLoggedIn on logout
    if (inactivityTimer) clearTimeout(inactivityTimer);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEEP_LOGGED_IN_KEY);
    router.push('/login');
  }, [router]);


  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    const storedKeepLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEEP_LOGGED_IN_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedKeepLoggedIn) {
      setKeepLoggedInState(JSON.parse(storedKeepLoggedIn));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user && !keepLoggedIn) {
      resetInactivityTimer();
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keydown', resetInactivityTimer);
      window.addEventListener('mousedown', resetInactivityTimer);
      window.addEventListener('touchstart', resetInactivityTimer);
    } else {
      if (inactivityTimer) clearTimeout(inactivityTimer);
    }

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('mousedown', resetInactivityTimer);
      window.removeEventListener('touchstart', resetInactivityTimer);
    };
  }, [user, keepLoggedIn, resetInactivityTimer]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const loggedInUser = await mockLogin(email, password);
    setUser(loggedInUser);
    if (loggedInUser) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(loggedInUser));
      // keepLoggedIn state is handled by its own setter
    }
    setIsLoading(false);
    return loggedInUser;
  };

  const register = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    const registeredUser = await mockRegister(fullName, email, password);
    setUser(registeredUser);
    if (registeredUser) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(registeredUser));
      // New users are not "kept logged in" by default, this is set on login form
      setKeepLoggedInState(false); 
      localStorage.setItem(LOCAL_STORAGE_KEEP_LOGGED_IN_KEY, JSON.stringify(false));
    }
    setIsLoading(false);
    return registeredUser;
  };

  const setKeepLoggedIn = (value: boolean) => {
    setKeepLoggedInState(value);
    localStorage.setItem(LOCAL_STORAGE_KEEP_LOGGED_IN_KEY, JSON.stringify(value));
  };


  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, keepLoggedIn, setKeepLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
