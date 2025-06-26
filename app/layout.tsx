"use client";

import "./globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import ThemeProvider from "@/components/theme-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/login");

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {isLogin ? (
            children
          ) : (
            <div className="flex min-h-screen">
              <div className="md:hidden">
                <MobileNav />
              </div>
              <div className="hidden md:flex">
                <Sidebar />
              </div>
              <main className="flex-1 w-full p-4">{children}</main>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
