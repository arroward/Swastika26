'use client';

export default function GradientBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Main Red Gradient - Static */}
            <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    background: 'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)'
                }}
            />

            {/* Secondary Accent Glows - Static */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-main/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
        </div>
    );
}
