import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateGradientSVG } from "@/lib/gradient";

interface Project {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

function AppsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newAppName, setNewAppName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameName, setRenameName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const allProjects = await window.database.getAllProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApp = async () => {
    if (!newAppName.trim()) return;
    try {
      const newProject = await window.database.createProject(newAppName);
      setProjects([newProject, ...projects]);
      setNewAppName("");
      setDialogOpen(false);
      navigate({ to: "/app/$appId", params: { appId: newProject.id } });
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await window.database.deleteProject(deleteId);
      setProjects(projects.filter(p => p.id !== deleteId));
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleRenameConfirm = async () => {
    if (!renameId || !renameName.trim()) return;
    try {
      await window.database.renameProject(renameId, renameName.trim());
      setProjects(projects.map(p => p.id === renameId ? { ...p, name: renameName.trim() } : p));
    } catch (error) {
      console.error('Failed to rename project:', error);
    } finally {
      setRenameId(null);
      setRenameName("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">My Apps</h1>
            <p className="text-muted-foreground">Create and manage your landing pages</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New App
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New App</DialogTitle>
                <DialogDescription>Give your landing page a name to get started</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">App Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., My Flower Shop"
                    value={newAppName}
                    onChange={(e) => setNewAppName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleCreateApp(); }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateApp} disabled={!newAppName.trim()}>Create App</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delete confirmation dialog */}
        <Dialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete App</DialogTitle>
              <DialogDescription>This will permanently delete the app and its build files.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rename dialog */}
        <Dialog open={!!renameId} onOpenChange={(open) => { if (!open) { setRenameId(null); setRenameName(""); } }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename App</DialogTitle>
              <DialogDescription>Enter a new name for your app</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="rename">App Name</Label>
                <Input
                  id="rename"
                  value={renameName}
                  onChange={(e) => setRenameName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleRenameConfirm(); }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setRenameId(null); setRenameName(""); }}>Cancel</Button>
              <Button onClick={handleRenameConfirm} disabled={!renameName.trim()}>Rename</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="space-y-4">
              <p className="text-muted-foreground">No apps yet. Create your first one!</p>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New App
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ContextMenu key={project.id}>
                <ContextMenuTrigger asChild>
                  <div className="relative">
                    <Link to="/app/$appId" params={{ appId: project.id }}>
                      <Card className="cursor-pointer py-0 pt-4 pb-6 transition-colors hover:bg-accent group/card overflow-hidden">
                        <div className="px-4 pt-0">
                          <div
                            className="h-40 w-full rounded-md overflow-hidden"
                            dangerouslySetInnerHTML={{ __html: generateGradientSVG(Number(project.id)) }}
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{project.name}</CardTitle>
                          <CardDescription>Updated {new Date(project.updated_at).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">Click to open and edit</p>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover/card:opacity-100 transition-opacity" />
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                  <ContextMenuItem onClick={() => { setRenameId(project.id); setRenameName(project.name); }}>
                    Rename
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive" onClick={() => setDeleteId(project.id)}>
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/apps")({
  component: AppsPage,
});
