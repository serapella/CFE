"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, Search, User, BarChart2, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { ApiService } from "@/config/api";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(typeof window !== 'undefined' && !!sessionStorage.getItem('token'));
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogout = async () => {
    sessionStorage.removeItem('token');
    try {
      await ApiService.logout();
    } catch (e) {}
    window.location.href = '/auth/login';
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <span className="relative h-16 w-48 sm:h-20 sm:w-64 lg:h-24 lg:w-80 block max-w-xs min-w-[120px]">
              <Image
                src="/BarcodeBM.png"
                alt="BODY MATTERS logo"
                fill
                className="object-contain dark:hidden"
                priority
              />
              <Image
                src="/BarcodeBMWhite.png"
                alt="BODY MATTERS logo"
                fill
                className="object-contain hidden dark:block"
                priority
              />
            </span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <Link
                          href="/recipes"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Explore Recipes
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover healthy recipes tailored to your
                            preferences
                          </p>
                        </Link>
                      </li>
                      <li>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/recipes/create">Create Recipe</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/recipes/favorites">My Favorites</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/shopping-list">Shopping List</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <Link
                          href="/products"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Product Database
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our database of products with detailed
                            health information
                          </p>
                        </Link>
                      </li>
                      <li>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/products/scan">Scan Product</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/products/compare">Compare Products</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/health-goals">Health Goals</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/community"
                    className={navigationMenuTriggerStyle()}
                  >
                    Community
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          <div className="hidden md:block">
            <ModeToggle />
          </div>

          <div className="hidden md:flex gap-2">
            {isLoggedIn ? (
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2">
                  <span className="relative h-10 w-32 block">
                    <Image
                      src="/BarcodeBM.png"
                      alt="BODY MATTERS logo"
                      fill
                      className="object-contain dark:hidden"
                      priority
                    />
                    <Image
                      src="/BarcodeBMWhite.png"
                      alt="BODY MATTERS logo"
                      fill
                      className="object-contain hidden dark:block"
                      priority
                    />
                  </span>
                </Link>

                <div className="flex flex-col gap-2">
                  <Link href="/recipes" className="py-2 text-lg">
                    Recipes
                  </Link>
                  <Link href="/products" className="py-2 text-lg">
                    Products
                  </Link>
                  <Link href="/products/scan" className="py-2 text-lg">
                    Scan Product
                  </Link>
                  <Link href="/shopping-list" className="py-2 text-lg">
                    Shopping List
                  </Link>
                  <Link href="/community" className="py-2 text-lg">
                    Community
                  </Link>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full">Sign up</Button>
                  </Link>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">
                      Switch theme
                    </span>
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
