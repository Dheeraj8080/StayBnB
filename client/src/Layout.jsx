import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  useEffect(() => {
    axios.get("/places");
  }, []);
  return (
    <div className="py-4  px-20 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
