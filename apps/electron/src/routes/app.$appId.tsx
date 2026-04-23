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
  const [componentFiles, setComponentFiles] = useState<string[]>([]);
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => {
    window.database.getProject(appId).then((p) => {
      if (p) {
        setProjectName(p.name);
        if (p.section_plan) {
          const plan = JSON.parse(p.section_plan);
          setComponentFiles(plan.sections.map((s: any) => `${s.file_name}.tsx`));
          setGenerationStatus("done");
        }
      }
    });
  }, [appId]);

  const handleReset = async () => {
    try {
      await Promise.all([
        window.database.resetProject(appId),
        landingPageApi.resetSession(appId),
      ]);
    } catch (error) {
      console.error('Reset error:', error);
    } finally {
      setGenerationStatus("idle");
      setComponentFiles([]);
      resetRef.current();
    }
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
          onPlanChange={(plan) => setComponentFiles(plan.sections.map((s: any) => `${s.file_name}.tsx`))}
          resetRef={resetRef}
        />
        <PreviewWindow projectId={appId} status={generationStatus} componentFiles={componentFiles} />
      </div>
    </SidebarProvider>
  );
}
