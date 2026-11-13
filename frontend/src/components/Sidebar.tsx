
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Video,
  Layers,
  ScanEye,
  GitCompare,
  ChartNoAxesCombined,
  Car,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  // { name: "Video Upload", path: "/upload", icon: Video },
  // { name: "Panoptic Results", path: "/panoptic", icon: Layers },
  // { name: "Depth Estimation", path: "/depth", icon: ScanEye },
  // { name: "Model Comparison", path: "/comparison", icon: GitCompare },
  // { name: "Evaluation", path: "/evaluation", icon: ChartNoAxesCombined },
];

export default function Sidebar() {
  return (
<aside className="
  fixed
  top-0
  left-0
  z-50
  w-64
  h-screen
  bg-[#0D1525]
  p-5
  flex
  flex-col
  overflow-y-auto
">
      <div className="flex items-center gap-3 mb-10">
        {/* <div className="bg-blue-600 p-2 rounded-xl">
          <Car size={25} />
        </div> */}

        <div>
          <h1 className="text-l font-bold text-white">
            PanoView
          </h1>
          {/* <p className="text-xs text-slate-400">
            AI Vision Studio
          </p> */}
        </div>
      </div>

      {/* <p className="text-xs text-slate-500 uppercase mb-4">
        Workspace
      </p> */}

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-5">
        <p className="text-xs text-slate-500">
          FYP Research Prototype
        </p>
        <p className="text-xs text-slate-600 mt-1">
          Video Depth-Aware Segmentation
        </p>
      </div>
    </aside>
  );
}
