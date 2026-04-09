'use client'

import { SidebarInset } from '@/components/ui/sidebar'

export function MainContent() {
  return (
    <SidebarInset className="flex flex-col bg-black text-white">
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
