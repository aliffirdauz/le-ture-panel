import "./globals.css";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import ThemeProvider from "@/components/theme-provider";

export const metadata = {
  title: "Le-Ture Panel",
  description: "Factory Monitoring Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {/* Mobile Header */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          <div className="flex min-h-screen">
            {/* Sidebar hanya untuk md ke atas */}
            <div className="hidden md:flex">
              <Sidebar />
            </div>

            {/* Content */}
            <main className="flex-1 w-full p-4">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
