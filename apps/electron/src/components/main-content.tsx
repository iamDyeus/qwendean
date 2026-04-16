'use client'

import { SidebarInset } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { RotateCw } from 'lucide-react'

export function MainContent() {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <SidebarInset className="flex flex-col bg-black text-white">
      <main className="flex-1 overflow-auto p-4">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground">
              Content will be rendered here
            </p>
            <Button
              onClick={handleReload}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCw className="h-4 w-4" />
              Reload
            </Button>
          </div>
        </div>
      </main>
    </SidebarInset>
  )
}
