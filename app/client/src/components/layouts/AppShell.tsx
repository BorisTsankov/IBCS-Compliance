import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  History as HistoryIcon,
  LayoutDashboard,
  LogOut,
  Monitor,
  Moon,
  PanelLeft,
  Settings,
  Shield,
  Sun,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "History",
    href: "/history",
    icon: HistoryIcon,
  },
  {
    label: "Security",
    href: "/security",
    icon: Shield,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const AppShell = () => {
  const { user, logout } = useUser();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
  <div className="flex h-screen overflow-hidden">
    <aside className="hidden h-screen w-62.5 shrink-0 border-r bg-card lg:flex lg:flex-col">
          <div className="flex items-center gap-3 border-b px-6 py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
              <PanelLeft className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-foreground">
                Scoped
              </p>
              <p className="text-xs text-muted-foreground">IBCS Checker</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-violet-600 text-white shadow-sm"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t px-4 py-4">
            <div className="mb-4 rounded-xl bg-accent px-4 py-3">
              <p className="text-sm font-medium text-foreground">
                {user?.username ?? "Guest"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {location.pathname}
              </p>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2 rounded-xl bg-accent p-1">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center rounded-lg py-2 text-xs transition ${
                  theme === "light"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sun className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center rounded-lg py-2 text-xs transition ${
                  theme === "dark"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Moon className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`flex items-center justify-center rounded-lg py-2 text-xs transition ${
                  theme === "system"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;