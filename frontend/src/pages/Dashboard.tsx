
import {
    Video,
    Layers,
    Gauge,
    Clock,
    ArrowUpRight,
    Activity
  } from "lucide-react";
  
  const stats = [
    {
      title: "Videos Processed",
      value: "0",
      description: "Total processed videos",
      icon: Video,
    },
    {
      title: "Segmentation Accuracy",
      value: "--",
      description: "PQ score",
      icon: Layers,
    },
    {
      title: "Processing Speed",
      value: "--",
      description: "Frames per second",
      icon: Gauge,
    },
    {
      title: "Inference Time",
      value: "--",
      description: "Seconds per frame",
      icon: Clock,
    },
  ];
  
  export default function Dashboard() {
    return (
      <div className="space-y-8">
  
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
              Video Depth-Aware Panoptic Segmentation
            </p>
          </div>
  
          <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-lg text-sm">
            <Activity size={15} className="inline mr-2" />
            System Ready
          </div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
  
          {stats.map((stat) => {
            const Icon = stat.icon;
  
            return (
              <div
                key={stat.title}
                className="bg-[#111C2E] border border-slate-800 rounded-xl p-5"
              >
                <div className="flex justify-between">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Icon className="text-blue-400" />
                  </div>
  
                  <ArrowUpRight className="text-slate-600" />
                </div>
  
                <p className="text-slate-400 text-sm mt-5">
                  {stat.title}
                </p>
  
                <h2 className="text-3xl font-bold mt-2">
                  {stat.value}
                </h2>
  
                <p className="text-xs text-slate-500 mt-2">
                  {stat.description}
                </p>
              </div>
            );
          })}
  
        </div>
  
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
  
          <div className="xl:col-span-2 bg-[#111C2E] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Video Analysis
            </h2>
  
            <p className="text-sm text-slate-400 mt-1">
              Your latest video processing results will appear here.
            </p>
  
            <div className="mt-6 h-64 rounded-xl border border-dashed border-slate-700 flex flex-col items-center justify-center">
              <Video size={42} className="text-slate-600" />
              <p className="text-slate-400 mt-4">
                No videos processed yet
              </p>
              <p className="text-xs text-slate-600 mt-2">
                Upload a driving video to begin
              </p>
            </div>
          </div>
  
          <div className="bg-[#111C2E] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Model Components
            </h2>
  
            <div className="space-y-5 mt-6">
              {[
                "Feature Encoder",
                "Depth Estimation",
                "Panoptic Segmentation",
                "Depth Fusion",
                "Temporal Association",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-slate-300">
                    {item}
                  </span>
  
                  <span className="text-xs text-slate-500">
                    Awaiting integration
                  </span>
                </div>
              ))}
            </div>
          </div>
  
        </div>
      </div>
    );
  }
  