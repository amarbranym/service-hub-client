"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { LayoutDashboard, LogOut, UserRound } from "lucide-react";

import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAuthUserSnapshot, notifyAuthChanged, subscribeAuthStore } from "@/lib/auth-store";
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

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-2xl font-semibold tracking-tight text-primary">
          ServiceHub
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/find-services" className="border-b-2 border-primary pb-0.5 text-foreground">
            Find Services
          </Link>
          <Link href="#" className="hover:text-foreground">
            Browse Categories
          </Link>
          <Link href="#" className="hover:text-foreground">
            How it Works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              Login
            </Link>
          ) : null}

          {isProvider ? (
            <Link
              href="/dashboard/provider"
              className={buttonVariants({ size: "sm", className: "h-9 px-4" })}
            >
              Dashboard
            </Link>
          ) : (
            <Link href="#" className={buttonVariants({ size: "sm", className: "h-9 px-4" })}>
              Join as Provider
            </Link>
          )}

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none ring-ring/50 focus-visible:ring-3">
                <Avatar>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{user?.fullName || "ServiceHub user"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {isProvider ? (
                  <DropdownMenuItem onClick={() => router.push("/dashboard/provider")}>
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => router.push("/find-services")}>
                    <UserRound className="size-4" />
                    My Account
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    localStorage.removeItem("servicehub_token");
                    localStorage.removeItem("servicehub_user");
                    notifyAuthChanged();
                    router.push("/login");
                  }}
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
