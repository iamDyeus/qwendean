import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  ArrowRight,
  Settings,
  RefreshCw,
  Trash2,
  Server,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateGradientSVG } from "@/lib/gradient";
import qwendeanLogo from "../../images/qwendean-light.svg";

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

  // Settings state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pingResult, setPingResult] = useState<{
    agents: boolean;
    toolkit: boolean;
  } | null>(null);
  const [pinging, setPinging] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);
  const [ollamaModels, setOllamaModels] = useState<string[]>([]);
  const [ollamaError, setOllamaError] = useState<string>("");
  const [ollamaNotice, setOllamaNotice] = useState<string>("");
  const [loadingModels, setLoadingModels] = useState(false);
  const [savingOllama, setSavingOllama] = useState(false);
  const [ollamaBaseUrl, setOllamaBaseUrl] = useState("");
  const [plannerModel, setPlannerModel] = useState("");
  const [generatorModel, setGeneratorModel] = useState("");

  const handlePingServers = async () => {
    setPinging(true);
    const result = await window.settings.pingServers();
    setPingResult(result);
    setPinging(false);
  };

  const handleRestartServers = async () => {
    setRestarting(true);
    await window.settings.restartServers();
    setRestarting(false);
    setPingResult(null);
  };

  const handleClearData = async () => {
    setClearing(true);
    await window.settings.clearUserData();
    setClearing(false);
    setSettingsOpen(false);
    loadProjects();
  };

  const handleListModels = async () => {
    setLoadingModels(true);
    const result = await window.settings.listOllamaModels(ollamaBaseUrl);
    const merged = [
      ...new Set(
        [...result.models, plannerModel, generatorModel].filter(Boolean),
      ),
    ];
    setOllamaModels(merged);
    setOllamaError(result.error ?? "");
    setLoadingModels(false);
  };

  const loadOllamaSettings = async () => {
    try {
      const settings = await window.settings.getOllamaSettings();
      setOllamaBaseUrl(settings.baseUrl);
      setPlannerModel(settings.plannerModel);
      setGeneratorModel(settings.generatorModel);
      setOllamaModels((prev) => [
        ...new Set(
          [...prev, settings.plannerModel, settings.generatorModel].filter(
            Boolean,
          ),
        ),
      ]);
    } catch (error) {
      console.error("Failed to load Ollama settings:", error);
    }
  };

  const handleSaveOllamaSettings = async () => {
    setSavingOllama(true);
    setOllamaNotice("");
    try {
      const saved = await window.settings.saveOllamaSettings({
        baseUrl: ollamaBaseUrl,
        plannerModel,
        generatorModel,
      });
      setOllamaBaseUrl(saved.baseUrl);
      setPlannerModel(saved.plannerModel);
      setGeneratorModel(saved.generatorModel);
      setOllamaNotice("Saved. Restarting servers to apply changes...");
      await window.settings.restartServers();
      setOllamaNotice("Saved. Servers restarted.");
    } catch (error) {
      console.error("Failed to save Ollama settings:", error);
      setOllamaError("Could not save Ollama settings.");
    } finally {
      setSavingOllama(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const allProjects = await window.database.getAllProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error("Failed to load projects:", error);
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
      console.error("Failed to create project:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    const idToDelete = deleteId;
    try {
      await window.database.deleteProject(idToDelete);
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setProjects((prev) => prev.filter((p) => p.id !== idToDelete));
      setDeleteId(null);
    }
  };

  const handleRenameConfirm = async () => {
    if (!renameId || !renameName.trim()) return;
    try {
      await window.database.renameProject(renameId, renameName.trim());
      setProjects(
        projects.map((p) =>
          p.id === renameId ? { ...p, name: renameName.trim() } : p,
        ),
      );
    } catch (error) {
      console.error("Failed to rename project:", error);
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
            <p className="text-muted-foreground">
              Create and manage your landing pages
            </p>
          </div>

          <div className="flex gap-2">
            {/* Settings button */}
            <Dialog
              open={settingsOpen}
              onOpenChange={(open) => {
                setSettingsOpen(open);
                if (!open) {
                  setPingResult(null);
                  setOllamaModels([]);
                  setOllamaError("");
                  setOllamaNotice("");
                } else {
                  loadOllamaSettings();
                }
              }}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                  <DialogDescription>
                    Manage servers and application data
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                  {/* Server controls */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Server className="h-4 w-4" />
                      Servers
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePingServers}
                        disabled={pinging}
                        className="flex-1"
                      >
                        {pinging ? "Pinging..." : "Ping Servers"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          await window.settings.stopServers();
                          setPingResult(null);
                        }}
                        className="flex-1"
                      >
                        Stop
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRestartServers}
                        disabled={restarting}
                        className="flex-1 gap-1"
                      >
                        <RefreshCw className="h-3 w-3" />
                        {restarting ? "Restarting..." : "Restart Servers"}
                      </Button>
                    </div>
                    {pingResult && (
                      <div className="flex gap-2">
                        <Badge
                          variant={
                            pingResult.agents ? "default" : "destructive"
                          }
                        >
                          Agents: {pingResult.agents ? "Online" : "Offline"}
                        </Badge>
                        <Badge
                          variant={
                            pingResult.toolkit ? "default" : "destructive"
                          }
                        >
                          Toolkit: {pingResult.toolkit ? "Online" : "Offline"}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Ollama models */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Ollama</p>
                    <div className="space-y-2">
                      <Label htmlFor="ollama-base-url">Ollama Base URL</Label>
                      <Input
                        id="ollama-base-url"
                        placeholder="http://localhost:11434"
                        value={ollamaBaseUrl}
                        onChange={(e) => setOllamaBaseUrl(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleListModels}
                      disabled={loadingModels}
                    >
                      {loadingModels ? "Loading..." : "Load Models"}
                    </Button>
                    <div className="space-y-2">
                      <Label>Planner Model (Orchestrator)</Label>
                      <Select
                        value={plannerModel}
                        onValueChange={setPlannerModel}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select planner model..." />
                        </SelectTrigger>
                        <SelectContent>
                          {ollamaModels.map((m) => (
                            <SelectItem key={`planner-${m}`} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Generator Model</Label>
                      <Select
                        value={generatorModel}
                        onValueChange={setGeneratorModel}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select generator model..." />
                        </SelectTrigger>
                        <SelectContent>
                          {ollamaModels.map((m) => (
                            <SelectItem key={`generator-${m}`} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSaveOllamaSettings}
                        disabled={savingOllama}
                      >
                        {savingOllama ? "Saving..." : "Save Ollama Settings"}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Auto-restarts servers.
                      </p>
                    </div>
                    {ollamaError && (
                      <p className="text-xs text-destructive">{ollamaError}</p>
                    )}
                    {ollamaNotice && (
                      <p className="text-xs text-muted-foreground">
                        {ollamaNotice}
                      </p>
                    )}
                    {ollamaModels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {ollamaModels.map((m) => (
                          <Badge key={m} variant="secondary">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Clear data */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Data</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          setClearingCache(true);
                          await window.settings.clearNextCache();
                          setClearingCache(false);
                        }}
                        disabled={clearingCache}
                        className="gap-1"
                      >
                        <RefreshCw
                          className={`h-3 w-3 ${clearingCache ? "animate-spin" : ""}`}
                        />
                        {clearingCache ? "Clearing..." : "Clear Next Cache"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleClearData}
                        disabled={clearing}
                        className="gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        {clearing ? "Clearing..." : "Clear All User Data"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Deletes all projects, conversations, and build files.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* New App button */}
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
                  <DialogDescription>
                    Give your landing page a name to get started
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">App Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., My Flower Shop"
                      value={newAppName}
                      onChange={(e) => setNewAppName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCreateApp();
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateApp}
                    disabled={!newAppName.trim()}
                  >
                    Create App
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Delete confirmation dialog */}
        <Dialog
          open={!!deleteId}
          onOpenChange={(open) => {
            if (!open) setDeleteId(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete App</DialogTitle>
              <DialogDescription>
                This will permanently delete the app and its build files.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rename dialog */}
        <Dialog
          open={!!renameId}
          onOpenChange={(open) => {
            if (!open) {
              setRenameId(null);
              setRenameName("");
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename App</DialogTitle>
              <DialogDescription>
                Enter a new name for your app
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="rename">App Name</Label>
                <Input
                  id="rename"
                  value={renameName}
                  onChange={(e) => setRenameName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameConfirm();
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setRenameId(null);
                  setRenameName("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRenameConfirm}
                disabled={!renameName.trim()}
              >
                Rename
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                No apps yet. Create your first one!
              </p>
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
                          <div className="relative h-40 w-full rounded-md overflow-hidden">
                            <div
                              className="absolute inset-0"
                              dangerouslySetInnerHTML={{
                                __html: generateGradientSVG(Number(project.id)),
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <img
                                src={qwendeanLogo}
                                alt="Qwendean"
                                className="h-12 w-auto opacity-90"
                              />
                            </div>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{project.name}</CardTitle>
                          <CardDescription>
                            Updated{" "}
                            {new Date(project.updated_at).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Click to open and edit
                          </p>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover/card:opacity-100 transition-opacity" />
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                  <ContextMenuItem
                    onClick={() => {
                      setRenameId(project.id);
                      setRenameName(project.name);
                    }}
                  >
                    Rename
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem
                    variant="destructive"
                    onClick={() => setDeleteId(project.id)}
                  >
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
