
import "./globals.css";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
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
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
