export default function BlogLoading() {
    return (
        <div className="min-h-screen bg-[#0e0e0e] py-20">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
                {/* Header skeleton */}
                <div className="text-center mb-16 space-y-4">
                    <div className="h-3 w-40 bg-white/5 rounded mx-auto animate-pulse" />
                    <div className="h-12 w-80 bg-white/5 rounded mx-auto animate-pulse" />
                    <div className="h-3 w-96 bg-white/5 rounded mx-auto animate-pulse" />
                </div>

                {/* Featured skeleton */}
                <div className="h-80 bg-white/[0.03] border border-white/[0.06] rounded-2xl mb-8 animate-pulse" />

                {/* Grid skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-72 bg-white/[0.03] border border-white/[0.06] rounded-2xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
