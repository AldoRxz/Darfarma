export default function ArticleLoading() {
    return (
        <div className="min-h-screen bg-[#0e0e0e]">
            {/* Hero image skeleton */}
            <div className="w-full aspect-[3/1] bg-white/[0.03] animate-pulse" />

            {/* Content skeleton */}
            <div className="max-w-[800px] mx-auto px-8 lg:px-12 -mt-16 pb-20">
                <div className="mb-10">
                    <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                </div>

                <div className="space-y-4">
                    <div className="h-5 w-28 bg-white/5 rounded animate-pulse" />
                    <div className="h-10 w-full bg-white/5 rounded animate-pulse" />
                    <div className="h-10 w-3/4 bg-white/5 rounded animate-pulse" />

                    <div className="flex gap-6 pt-4 pb-8 border-b border-white/[0.08]">
                        <div className="h-3 w-32 bg-white/5 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                    </div>
                </div>

                <div className="space-y-4 mt-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 bg-white/[0.03] rounded animate-pulse"
                            style={{ width: `${70 + Math.random() * 30}%` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
