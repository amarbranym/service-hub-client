"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import {
  CalendarCheck2,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Home,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getAuthUserSnapshot, notifyAuthChanged, subscribeAuthStore } from "@/lib/auth-store";
import { useSyncExternalStore } from "react";

const navItems = [
  { href: "/dashboard/provider", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/provider/my-bookings", label: "My Bookings", icon: CalendarCheck2 },
  { href: "/dashboard/provider/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/provider/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/provider/settings", label: "Settings", icon: Settings },
];

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function ProviderDashboardShell({ title, subtitle, action, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSyncExternalStore(subscribeAuthStore, getAuthUserSnapshot, () => null);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "provider") {
      router.replace("/find-services");
    }
  }, [router, user]);

  if (!user || user.role !== "provider") {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-muted/20 p-6">
        <p className="text-sm text-muted-foreground">Checking access...</p>
      </main>
    );
  }

  const initials = user.fullName
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "P";

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader className="p-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-primary">
            ServiceHub
          </Link>
          <div className="flex items-center gap-2 rounded-lg border bg-sidebar-accent/40 p-2">
            <Avatar className="size-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-semibold">{user.fullName || "Provider"}</p>
              <p className="text-[11px] text-muted-foreground">Manage your services</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                    onClick={() => router.push(item.href)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3">
          <SidebarSeparator className="mb-2" />
          <Button variant="ghost" className="justify-start " >
            <Link href="/" className="flex items-center gap-2">
              <Home />
              Back to Site
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start">
            <CircleHelp />
            Help Center
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground hover:text-foreground"
            onClick={() => {
              localStorage.removeItem("servicehub_token");
              localStorage.removeItem("servicehub_user");
              notifyAuthChanged();
              router.push("/login");
            }}
          >
            <LogOut />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-muted/20">
        <main className="min-h-svh p-4 md:p-6">
          <div className="mx-auto w-full max-w-6xl space-y-6">
            <header className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="md:hidden" />
                  <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                </div>
                {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
              </div>
              {action}
            </header>
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
