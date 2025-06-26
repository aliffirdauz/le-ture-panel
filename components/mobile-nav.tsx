"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

export default function MobileNav() {
  return (
    <div className="md:hidden px-4 py-3 border-b flex items-center justify-between bg-white sticky top-0 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Open Menu">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <p className="text-lg font-semibold">LeTure Panel</p>
    </div>
  );
}
