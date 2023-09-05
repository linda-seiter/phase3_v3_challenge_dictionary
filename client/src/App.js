import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import PlanetDetail from "./components/PlanetDetail";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/planets/:id/*" element={<PlanetDetail />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
