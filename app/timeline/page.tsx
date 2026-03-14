import type { Metadata } from "next";
import { timeline } from "@/lib/data";
import { Timeline } from "@/app/components/timeline";

export const metadata: Metadata = {
  title: "timeline — jason mclaren",
  description: "Academic timeline of Jason Mclaren.",
};

export default function TimelinePage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        timeline
      </h1>
      <Timeline events={timeline} />
    </div>
  );
}
