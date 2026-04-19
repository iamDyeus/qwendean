import type React from "react";
import DragWindowRegion from "@/components/drag-window-region";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <DragWindowRegion title="Без капиталистических багов ☭" /> {/* No capitalist bugs; lol */} 
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
