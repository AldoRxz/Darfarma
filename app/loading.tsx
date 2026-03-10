export default function Loading() {
    return (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-2 border-foreground/10" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
                </div>
                <span className="font-mono text-muted-foreground text-xs tracking-widest">
                    CARGANDO
                </span>
            </div>
        </div>
    )
}
