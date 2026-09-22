import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import LenisSmoothScroll from "@/components/ui/CustomUi/animation/components/LenisSmoothScroll";
import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <LenisSmoothScroll />
            <div className="fixed top-0 h-fit! w-full z-100!">
                <Navbar />
            </div>
            <div className="relative min-h-screen flex flex-col justify-between overflow-x-clip">
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default MainLayout;
