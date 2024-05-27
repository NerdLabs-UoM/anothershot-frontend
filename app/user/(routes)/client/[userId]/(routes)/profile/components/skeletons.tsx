"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
    return (
            <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-[125px] w-[125px] md:h-[200px] md:w-[200px] rounded-xl" />
                ))}
            </div>
    );
}
