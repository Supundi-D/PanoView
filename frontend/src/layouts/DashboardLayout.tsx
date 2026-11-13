
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, Bell, CircleUserRound } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full max-w-none overflow-x-hidden bg-[#080D18] text-white">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#0D1525] flex items-center px-5 gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>

        <h1 className="font-bold text-lg">PanoView</h1>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="relative w-64 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />

            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-3 text-white"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Full Available Device Width */}
      <main className="
  min-h-screen
  w-full
  min-w-0
  lg:ml-64
  lg:w-[calc(100%-16rem)]
  pt-16
  lg:pt-0
  border-0
">

        {/* Top Navigation */}
        <header className="hidden lg:flex h-16 w-full items-center justify-end px-8 bg-[#0D1525]">
          <div className="flex items-center gap-5">
            <Bell className="text-slate-400" size={20} />
            <CircleUserRound className="text-blue-400" size={23} />
          </div>
        </header>

        {/* Page Content */}
        <section className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </section>

      </main>
    </div>
  );
}
