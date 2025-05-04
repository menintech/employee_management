import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggler } from "@/components/ThemeToggler";

const quicksand = Quicksand({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "MenInTech EMP",
  description: "Employee Managment Solution",
  icons: {
    icon: "/menintech3.svg", // path in /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        <ClerkProvider signInForceRedirectUrl="/dashboard">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ThemeToggler />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
