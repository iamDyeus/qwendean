import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/chat-sidebar";
import { PreviewWindow } from "@/components/preview-window";
import { SiteHeader } from "@/components/site-header";
import { landingPageApi } from "@/lib/api";

export const Route = createFileRoute("/app/$appId")({
  component: AppChatPage,
});

export type GenerationStatus = "idle" | "understanding" | "waiting_approval" | "generating" | "done";

function AppChatPage() {
  const { appId } = Route.useParams();
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>("idle");
  const [projectName, setProjectName] = useState<string>("");
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => {
    window.database.getProject(appId).then((p) => {
      if (p) setProjectName(p.name);
    });
  }, [appId]);

  const handleReset = async () => {
    await Promise.all([
      window.database.resetProject(appId),
      landingPageApi.resetSession(appId),
    ]);
    setGenerationStatus("idle");
    resetRef.current();
  };

  return (
    <SidebarProvider
      className="flex flex-col h-full"
      style={{ "--sidebar-width": "600px" } as React.CSSProperties}
    >
      <SiteHeader projectName={projectName} onReset={handleReset} />
      <div className="flex flex-1 h-full overflow-hidden">
        <ChatSidebar
          projectId={appId}
          projectName={projectName}
          onStatusChange={setGenerationStatus}
          resetRef={resetRef}
        />
        <PreviewWindow projectId={appId} status={generationStatus} />
      </div>
    </SidebarProvider>
  );
}
