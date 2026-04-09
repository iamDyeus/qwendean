import type React from "react";
import DragWindowRegion from "@/components/drag-window-region";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DragWindowRegion title="qwendean" />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </>
  );
}
