import React from 'react';

interface MainContainerProps {
    children: React.ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
    return (
        <div
            className="relative z-10 w-full flex-1 min-h-0 bg-transparent rounded-[2rem] border border-white/5 overflow-y-auto overflow-x-hidden shadow-2xl scrollbar-hide snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            id="main-container"
        >
            {children}
        </div>
    );
}
