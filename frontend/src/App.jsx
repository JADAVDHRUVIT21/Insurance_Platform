import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Customers from "./pages/Customers";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/companies"
        element={<Companies />}

      />
      <Route
        path="/customers"
        element={<Customers />}
      />
    </Routes>
  );
}