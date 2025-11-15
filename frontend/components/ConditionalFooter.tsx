"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hideFooter = pathname === '/login' || pathname === '/signup';
  
  return !hideFooter ? <Footer /> : null;
}