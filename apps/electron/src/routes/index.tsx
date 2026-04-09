import { createFileRoute } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/chat-sidebar";
import { MainContent } from "@/components/main-content";
import { SiteHeader } from "@/components/site-header";

function HomePage() {
  return (
    <div className="dark h-full">
      <SidebarProvider 
        className="flex flex-col" 
        style={{ '--sidebar-width': '600px' } as React.CSSProperties}
      >
        <SiteHeader />
        <div className="flex flex-1 h-full">
          <ChatSidebar />
          <MainContent />
        </div>
      </SidebarProvider>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
