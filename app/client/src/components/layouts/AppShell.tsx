import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  Settings,
  Shield,
} from "lucide-react";
import { History as HistoryIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

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
  const { user } = useUser();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[250px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
              <PanelLeft className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-slate-900">Scoped</p>
              <p className="text-xs text-slate-400">IBCS Checker</p>
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
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
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

          <div className="border-t border-slate-100 px-4 py-4">
            <div className="mb-4 rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-900">
                {user?.username ?? "Guest"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {location.pathname}
              </p>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;