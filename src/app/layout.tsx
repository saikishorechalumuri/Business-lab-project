import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth-provider";
import { BusinessLabProvider } from "@/components/business-lab-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business Lab",
  description:
    "AI-powered internal business operating system for turning reports into action.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <BusinessLabProvider>{children}</BusinessLabProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
