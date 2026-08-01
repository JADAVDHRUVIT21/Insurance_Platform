import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <Header />

        <div className="page-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
}