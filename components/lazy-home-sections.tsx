"use client"

import dynamic from "next/dynamic"

const BentoGrid = dynamic(
    () =>
        import("@/components/bento-grid").then((mod) => ({
            default: mod.BentoGrid,
        })),
    { ssr: false }
)

const ActivationsSection = dynamic(
    () =>
        import("@/components/activations-section").then((mod) => ({
            default: mod.ActivationsSection,
        })),
    { ssr: false }
)

const SocialSection = dynamic(
    () =>
        import("@/components/social-section").then((mod) => ({
            default: mod.SocialSection,
        })),
    { ssr: false }
)

export function LazyHomeSections() {
    return (
        <>
            <BentoGrid />
            <ActivationsSection />
            <SocialSection />
        </>
    )
}
