'use client'

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export function MainContent() {
  return (
    <SidebarInset className="flex flex-col bg-black text-white">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-800 px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Chat App</h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">
            Content will be rendered here
          </p>
        </div>
      </main>
    </SidebarInset>
  )
}
