import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldCheck,
  FileText,
  BadgeIndianRupee,
  Hospital,
  Stethoscope,
  Pill,
  CalendarDays,
  CreditCard,
  Bell,
  Search,
  UserCircle,
  LogOut,
  FolderOpen,
  Activity,
  ClipboardCheck
} from "lucide-react";

import "./Sidebar.css";

export default function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <aside className="sidebar">

      {/* Logo */}

      <div className="logo">

        <h2>🏥 Insurance ERP</h2>

        <p>Management Platform</p>

      </div>

      {/* Dashboard */}

      <div className="menu-title">

        MAIN

      </div>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>

      {/* Management */}

      <div className="menu-title">

        MANAGEMENT

      </div>

      <NavLink
        to="/companies"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <Building2 size={20} />
        <span>Companies</span>
      </NavLink>

      <NavLink
        to="/customers"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <Users size={20} />
        <span>Customers</span>
      </NavLink>

      <NavLink
        to="/policies"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <ShieldCheck size={20} />
        <span>Policies</span>
      </NavLink>

      <NavLink
        to="/claims"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <FileText size={20} />
        <span>Claims</span>
      </NavLink>

      <NavLink
        to="/payments"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <BadgeIndianRupee size={20} />
        <span>Premium Payments</span>
      </NavLink>

      {/* Medical */}

      <div className="menu-title">

        MEDICAL

      </div>

      <NavLink
        to="/hospitals"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <Hospital size={20} />
        <span>Hospitals</span>
      </NavLink>

      <NavLink
        to="/doctors"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <Stethoscope size={20} />
        <span>Doctors</span>
      </NavLink>

      <NavLink
        to="/medicines"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <Pill size={20} />
        <span>Medicines</span>
      </NavLink>

      <NavLink
        to="/appointments"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <CalendarDays size={20} />
        <span>Appointments</span>
      </NavLink>

      {/* Reports */}

      <div className="menu-title">

        REPORTS

      </div>

      <NavLink
        to="/documents"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <FolderOpen size={20} />
        <span>Documents</span>
      </NavLink>

      <NavLink
        to="/reports"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <ClipboardCheck size={20} />
        <span>Reports</span>
      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <Activity size={20} />
        <span>Analytics</span>
      </NavLink>

      {/* Others */}

      <div className="menu-title">

        SETTINGS

      </div>

      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <Bell size={20} />
        <span>Notifications</span>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <Search size={20} />
        <span>Search</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <UserCircle size={20} />
        <span>Profile</span>
      </NavLink>

      {/* Logout */}

      <button
        className="logout-btn"
        onClick={logout}
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>

  );

}