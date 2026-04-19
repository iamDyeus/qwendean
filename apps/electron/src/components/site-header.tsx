"use client"

import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Settings, Plus, RotateCcw, ChevronRight } from "lucide-react"
import qwendeanLogo from "../../images/qwendean-light.svg"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

export function SiteHeader({ projectName, onReset }: { projectName?: string; onReset?: () => void }) {
  const [newAppDialogOpen, setNewAppDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [appName, setAppName] = useState("")

  const handleCreateApp = () => {
    if (appName.trim()) {
      // TODO: Create app logic
      console.log("Creating app:", appName)
      setNewAppDialogOpen(false)
      setAppName("")
    }
  }

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background pb-2">
      <div className="flex h-14 w-full items-center gap-2 px-4">
        <SidebarTrigger className="h-8 w-8" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        
        <div className="flex items-center gap-3 text-sm">
          <Link to="/apps" className="hover:opacity-80 transition-opacity">
            <img src={qwendeanLogo} alt="My Apps" className="h-4 w-auto" />
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-base">{projectName || "..."}</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {onReset && (
            <Button size="sm" variant="ghost" className="gap-2 text-muted-foreground hover:text-destructive" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          )}
          <Dialog open={newAppDialogOpen} onOpenChange={setNewAppDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New App
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New App</DialogTitle>
                <DialogDescription>
                  Enter a name for your new app
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">App Name</Label>
                  <Input
                    id="app-name"
                    placeholder="My Awesome App"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateApp()
                      }
                    }}
                  />
                </div>
                <Button onClick={handleCreateApp} className="w-full">
                  Create App
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="settings" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>
                <TabsContent value="settings" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Customize your app appearance
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Manage notification preferences
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="about" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Qwendean</h3>
                    <p className="text-sm text-muted-foreground">
                      Version 1.0.0
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Built with Electron, React, and shadcn/ui
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
