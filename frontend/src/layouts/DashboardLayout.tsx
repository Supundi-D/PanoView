
import { Outlet } from "react-router-dom";
import { Bell, CircleUserRound } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#080D18] text-slate-100 flex">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0D1525]">
          <div>
            <p className="text-sm text-slate-400">
              PanoView / Workspace
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Bell size={19} className="text-slate-400" />
            <CircleUserRound size={23} className="text-blue-400" />
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
}
