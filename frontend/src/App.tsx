// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-slate-400 mt-2">
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
          <Route path="/upload" element={<Placeholder title="Video Upload" />} />
          <Route path="/panoptic" element={<Placeholder title="Panoptic Results" />} />
          <Route path="/depth" element={<Placeholder title="Depth Estimation" />} />
          <Route path="/comparison" element={<Placeholder title="Model Comparison" />} />
          <Route path="/evaluation" element={<Placeholder title="Model Evaluation" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
