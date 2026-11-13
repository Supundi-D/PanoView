
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import VideoUpload from "./pages/VideoUpload";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-400">
        This module will be implemented in the next stage.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/upload" element={<VideoUpload />} />

          <Route
            path="/panoptic"
            element={<Placeholder title="Panoptic Results" />}
          />

          <Route
            path="/depth"
            element={<Placeholder title="Depth Estimation" />}
          />

          <Route
            path="/comparison"
            element={<Placeholder title="Model Comparison" />}
          />

          <Route
            path="/evaluation"
            element={<Placeholder title="Model Evaluation" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
