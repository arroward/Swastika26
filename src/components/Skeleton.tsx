// Skeleton loading component
export function SkeletonCard() {
    return (
        <div className="animate-pulse">
            <div className="bg-white/5 rounded-2xl h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <div className="h-full flex flex-col justify-end p-6 md:p-8 lg:p-12">
                    <div className="h-3 bg-white/10 rounded w-1/3 mb-4"></div>
                    <div className="h-12 md:h-16 bg-white/10 rounded w-2/3 mb-4"></div>
                    <div className="h-10 bg-white/10 rounded w-32"></div>
                </div>
            </div>
        </div>
    );
}

export function SkeletonEventCard() {
    return (
        <div className="animate-pulse">
            <div className="bg-white/5 rounded-2xl h-[300px] w-full p-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-8 bg-white/10 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
            </div>
        </div>
    );
}

export function SkeletonText({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse ${className}`}>
            <div className="h-4 bg-white/10 rounded w-full"></div>
        </div>
    );
}

export function SkeletonImage({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-white/5 ${className}`}>
            <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
}
