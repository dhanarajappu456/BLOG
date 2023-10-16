import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  console.log("layout haai");
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
