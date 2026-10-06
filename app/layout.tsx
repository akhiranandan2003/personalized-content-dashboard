import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/Provider";

export const metadata: Metadata = { title: "PulseBoard | Personalized Content Dashboard", description: "A personalized content dashboard built with Next.js, TypeScript and Redux Toolkit." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><StoreProvider>{children}</StoreProvider></body></html>; }
