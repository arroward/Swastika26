"use client";

import { usePathname } from "next/navigation";
import Preloader from "@/components/Preloader";
import GradientBackground from "@/components/GradientBackground";
import NoiseOverlay from "@/components/NoiseOverlay";
import Navbar from "@/components/Navbar";
import MainContainer from "@/components/MainContainer";
import NotificationPermissionRequest from "@/components/NotificationPermissionRequest";
import VisitorLogger from "@/components/VisitorLogger";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMaintenance = pathname === "/maintenance";

    if (isMaintenance) {
        return (
            <div className="h-full w-full">
                {children}
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col gap-2 md:gap-4 p-2 md:p-4 lg:p-6">
            <GradientBackground />
            <NoiseOverlay />
            <Preloader />
            <NotificationPermissionRequest />
            <VisitorLogger />
            <Navbar />
            <MainContainer>
                {children}
            </MainContainer>
        </div>
    );
}
