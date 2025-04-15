
import React from 'react';
import { MapPinIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-6 h-6 text-campus-primary" />
          <h1 className="text-xl font-bold tracking-tight text-campus-primary">
            Campus Navigator
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-campus-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-sm font-medium hover:text-campus-primary transition-colors">
              Campus Map
            </a>
            <a href="#" className="text-sm font-medium hover:text-campus-primary transition-colors">
              Points of Interest
            </a>
            <a href="#" className="text-sm font-medium hover:text-campus-primary transition-colors">
              About
            </a>
          </nav>
          <Button variant="outline" className="border-campus-primary text-campus-primary hover:bg-campus-primary hover:text-white">
            Login
          </Button>
        </div>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="w-5 h-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Campus Navigator</SheetTitle>
              <SheetDescription>Find your way around campus</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              <a href="/" className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                Home
              </a>
              <a href="#" className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                Campus Map
              </a>
              <a href="#" className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                Points of Interest
              </a>
              <a href="#" className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                About
              </a>
              <Button className="mt-2 bg-campus-primary hover:bg-campus-secondary">
                Login
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
