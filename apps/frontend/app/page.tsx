'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { ChatSidebar } from '@/components/chat-sidebar'
import { MainContent } from '@/components/main-content'

export default function Home() {
  return (
    <div className="dark">
      <SidebarProvider style={{ '--sidebar-width': '600px' } as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <ChatSidebar />
          <MainContent />
        </div>
      </SidebarProvider>
    </div>
  )
}
