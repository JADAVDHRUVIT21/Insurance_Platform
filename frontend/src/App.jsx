import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Companies from "./pages/Companies";
import Customers from "./pages/Customers";
import Policies from "./pages/Policies";
import Claims from "./pages/Claims";
import PremiumPayments from "./pages/PremiumPayments";
import Hospitals from "./pages/Hospitals";
import Doctors from "./pages/Doctors";
import Medicines from "./pages/Medicines";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="companies" element={<Companies />} />
        <Route path="customers" element={<Customers />} />
        <Route path="policies" element={<Policies />} />
        <Route path="claims" element={<Claims />} />
        <Route path="payments" element={<PremiumPayments />} />
        <Route path="hospitals" element={<Hospitals />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="appointments" element={<Appointments />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;