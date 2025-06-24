import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Use Outlet for rendering child routes
import Sidebar from "./components/Sidebar/Sidebar"; // Import Sidebar (if needed)

function RootLayout() {
  const location = useLocation();
  const noSidebarRoutes = ["/signin", "/signup"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname.toLowerCase());

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {showSidebar && <Sidebar />} {/* Show Sidebar based on the route */}
      <main style={{ width: "100%", padding: showSidebar ? "20px" : "0" }}>
        <Outlet /> {/* This renders the child routes */}
      </main>
    </div>
  );
}

export default RootLayout;
