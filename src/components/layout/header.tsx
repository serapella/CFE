"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Menu, Search, User, ShoppingCart, BarChart2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm border-b' : 'bg-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" legacyBehavior>
            <BarChart2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BODYMATTERS</span>
          </Link>
          
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/recipes"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Explore Recipes
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Discover healthy recipes tailored to your preferences
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link href="/recipes/create" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Create Recipe
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/recipes/favorites" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            My Favorites
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shopping-list" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Shopping List
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/products"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Product Database
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore our database of products with detailed health information
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link href="/products/scan" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Scan Product
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/compare" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Compare Products
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/health-goals" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Health Goals
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/community" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Community
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link href="/shopping-list" legacyBehavior>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          
          <div className="hidden md:flex gap-2">
            <Link href="/login" legacyBehavior>
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register" legacyBehavior>
              <Button>Sign up</Button>
            </Link>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2" legacyBehavior>
                  <BarChart2 className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">BODYMATTERS</span>
                </Link>
                
                <div className="flex flex-col gap-2">
                  <Link href="/recipes" className="py-2 text-lg">Recipes</Link>
                  <Link href="/products" className="py-2 text-lg">Products</Link>
                  <Link href="/products/scan" className="py-2 text-lg">Scan Product</Link>
                  <Link href="/shopping-list" className="py-2 text-lg">Shopping List</Link>
                  <Link href="/community" className="py-2 text-lg">Community</Link>
                </div>
                
                <div className="flex flex-col gap-2 mt-auto">
                  <Link href="/login" legacyBehavior>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link href="/register" legacyBehavior>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">Switch theme</span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}