import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import ConditionalFooter from "../components/ConditionalFooter";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title: "CrimeNet - Community Safety Platform",
  description: "AI-powered community security intelligence system for real-time crime reporting, analysis, and response coordination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-sans flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <ConditionalFooter />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
