export default function BackgroundGlows() {
    return (
        <>
            {/* Dynamic Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
        </>
    );
}
