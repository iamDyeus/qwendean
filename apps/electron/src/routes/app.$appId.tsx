import { createFileRoute } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/chat-sidebar";
import { PreviewWindow } from "@/components/preview-window";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/app/$appId")({
  component: AppChatPage,
});

function AppChatPage() {
  const { appId } = Route.useParams();

  return (
    <div className="dark h-full">
      <SidebarProvider 
        className="flex flex-col" 
        style={{ '--sidebar-width': '600px' } as React.CSSProperties}
      >
        <SiteHeader />
        <div className="flex flex-1 h-full">
          <ChatSidebar projectId={appId} />
          <PreviewWindow projectId={appId} />
        </div>
      </SidebarProvider>
    </div>
  );
}
