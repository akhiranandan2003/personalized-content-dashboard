"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [active, setActive] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  useEffect(() => { const saved = localStorage.getItem("pulse-dark"); setDark(saved === "true"); }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); localStorage.setItem("pulse-dark", String(dark)); }, [dark]);
  return <div className="min-h-screen"><Header query={query} setQuery={setQuery} dark={dark} setDark={setDark} /><div className="mx-auto flex max-w-7xl"><Sidebar active={active} setActive={setActive} /><main className="min-w-0 flex-1 p-4 sm:p-6"><Dashboard query={query} active={active} /></main></div></div>;
}
