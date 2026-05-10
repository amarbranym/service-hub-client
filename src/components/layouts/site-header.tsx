"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { LayoutDashboard, LogOut, UserRound } from "lucide-react";

import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAuthUserSnapshot, notifyAuthChanged, subscribeAuthStore } from "@/lib/auth-store";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSyncExternalStore(subscribeAuthStore, getAuthUserSnapshot, () => null);

  const role = user?.role ?? null;
  const isLoggedIn = Boolean(role);
  const isProvider = role === "provider";
  const initials = user?.fullName
    ? user.fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("")
    : "U";

  const navLinks = [
    { href: "/find-services", label: "Find Services" },
    { href: "/categories", label: "Browse Categories" },
    { href: "/#how-it-works", label: "How it Works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300">
      <Container className="flex h-16 items-center justify-between">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-primary transition-all hover:opacity-90"
        >
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ServiceHub
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative py-1 transition-colors hover:text-foreground",
                  isActive 
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Login
            </Link>
          ) : null}

          {isProvider ? (
            <Link
              href="/dashboard/provider"
              className={buttonVariants({ 
                variant: "default",
                size: "sm", 
                className: "h-9 px-5 font-medium shadow-sm hover:shadow-md transition-all active:scale-95" 
              })}
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              href="#" 
              className={buttonVariants({ 
                variant: "default",
                size: "sm", 
                className: "h-9 px-5 font-medium shadow-sm hover:shadow-md transition-all active:scale-95" 
              })}
            >
              Join as Provider
            </Link>
          )}

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="group relative rounded-full outline-none ring-ring/50 transition-all focus-visible:ring-3">
                <Avatar className="size-9 border-2 border-background ring-1 ring-border transition-all group-hover:ring-primary/50">
                  <AvatarFallback className="bg-muted text-xs font-bold text-muted-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-border/50 backdrop-blur-xl">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col space-y-1.5 p-3">
                    <p className="text-sm font-semibold leading-none text-foreground">{user?.fullName || "ServiceHub User"}</p>
                    <p className="text-xs leading-none text-muted-foreground font-medium">{user?.email || ""}</p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuGroup className="p-1">
                  {isProvider ? (
                    <DropdownMenuItem 
                      className="rounded-md px-3 py-2 cursor-pointer focus:bg-accent"
                      onClick={() => router.push("/dashboard/provider")}
                    >
                      <LayoutDashboard className="mr-2 size-4 opacity-70" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem 
                      className="rounded-md px-3 py-2 cursor-pointer focus:bg-accent"
                      onClick={() => router.push("/find-services")}
                    >
                      <UserRound className="mr-2 size-4 opacity-70" />
                      <span>My Account</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuGroup className="p-1">
                  <DropdownMenuItem
                    variant="destructive"
                    className="rounded-md px-3 py-2 cursor-pointer focus:bg-destructive/10"
                    onClick={() => {
                      localStorage.removeItem("servicehub_token");
                      localStorage.removeItem("servicehub_user");
                      notifyAuthChanged();
                      router.push("/login");
                    }}
                  >
                    <LogOut className="mr-2 size-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
