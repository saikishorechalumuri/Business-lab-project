"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthUser = {
  fullName: string;
  email: string;
  businessName: string;
  role: string;
  verifiedAt: string;
};

type PendingUser = Omit<AuthUser, "verifiedAt">;

type AuthContextValue = {
  user: AuthUser | null;
  pendingUser: PendingUser | null;
  demoOtp: string;
  requestOtp: (user: PendingUser) => void;
  verifyOtp: (otp: string) => boolean;
  signOut: () => void;
};

const AUTH_STORAGE_KEY = "business-lab-auth-user";
const OTP_STORAGE_KEY = "business-lab-demo-otp";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);
  const [demoOtp, setDemoOtp] = useState("246810");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const savedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
      const savedOtp = window.localStorage.getItem(OTP_STORAGE_KEY);

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser) as AuthUser);
        } catch {
          window.localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }

      if (savedOtp) {
        setDemoOtp(savedOtp);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      pendingUser,
      demoOtp,
      requestOtp(nextPendingUser) {
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        setPendingUser(nextPendingUser);
        setDemoOtp(otp);
        window.localStorage.setItem(OTP_STORAGE_KEY, otp);
      },
      verifyOtp(otp) {
        if (!pendingUser || otp.trim() !== demoOtp) {
          return false;
        }

        const verifiedUser: AuthUser = {
          ...pendingUser,
          verifiedAt: new Date().toLocaleString(),
        };

        setUser(verifiedUser);
        setPendingUser(null);
        window.localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify(verifiedUser),
        );
        document.cookie =
          "business_lab_access=granted; path=/; max-age=604800; SameSite=Lax";
        return true;
      },
      signOut() {
        setUser(null);
        setPendingUser(null);
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        document.cookie =
          "business_lab_access=; path=/; max-age=0; SameSite=Lax";
      },
    }),
    [demoOtp, pendingUser, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
