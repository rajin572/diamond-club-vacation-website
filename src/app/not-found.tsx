import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import LenisSmoothScroll from "@/components/ui/CustomUi/animation/components/LenisSmoothScroll";
import { NotFoundView } from "@/components/notFound";

export default function NotFound() {
  return (
    <>
      <LenisSmoothScroll />
      <div className="fixed top-0 h-fit! w-full z-100!">
        <Navbar />
      </div>
      <div className="relative min-h-screen flex flex-col justify-between overflow-x-clip bg-[#FCFCFB]">
        <main className="flex-1 pt-20">
          <NotFoundView />
        </main>
        <Footer />
      </div>
    </>
  );
}