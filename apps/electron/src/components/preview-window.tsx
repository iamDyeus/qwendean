import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RotateCw, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";
import type { GenerationStatus } from "@/routes/app.$appId";
import { landingPageApi } from "@/lib/api";
import loaderGif from "../../images/qwendean-animated.gif";

interface PreviewWindowProps {
  projectId: string;
  status: GenerationStatus;
  componentFiles: string[];
}

const STATUS_MESSAGES: Record<Exclude<GenerationStatus, "done">, string> = {
  idle: "Start a conversation to build your landing page",
  understanding: "Understanding your requirements...",
  waiting_approval: "Waiting for your plan approval",
  generating: "Generating code...",
};

export function PreviewWindow({ projectId, status, componentFiles }: PreviewWindowProps) {
  const webviewRef = useRef<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ignoring, setIgnoring] = useState(false);

  const handleReload = () => webviewRef.current?.reload();

  const handleIgnoreErrors = async () => {
    if (!selectedFile) return;
    setIgnoring(true);
    try {
      await landingPageApi.ignoreErrors(projectId, selectedFile, errorMessage);
      setDialogOpen(false);
      setSelectedFile("");
      setErrorMessage("");
      setTimeout(() => webviewRef.current?.reload(), 300);
    } catch (e) {
      console.error("Failed to ignore errors:", e);
    } finally {
      setIgnoring(false);
    }
  };

  if (status !== "done") {
    const isLoading = status === "understanding" || status === "generating";
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-muted gap-3">
        {isLoading && <img src={loaderGif} alt="Loading" className="size-24" />}
        <p className="text-muted-foreground text-sm">{STATUS_MESSAGES[status]}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-muted relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {componentFiles.length > 0 && (
          <Button onClick={() => setDialogOpen(true)} variant="outline" size="sm" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Ignore Errors
          </Button>
        )}
        <Button onClick={handleReload} variant="outline" size="sm" className="gap-2">
          <RotateCw className="h-4 w-4" />
          Reload
        </Button>
      </div>

      <webview
        ref={webviewRef}
        src={`http://localhost:3000/builds/${projectId}`}
        className="w-full h-full"
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ignore Errors</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Faulty Component</Label>
              <Select value={selectedFile} onValueChange={setSelectedFile}>
                <SelectTrigger>
                  <SelectValue placeholder="Select component file..." />
                </SelectTrigger>
                <SelectContent>
                  {componentFiles.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Error Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input
                placeholder="e.g. Cannot read properties of undefined..."
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleIgnoreErrors} disabled={!selectedFile || ignoring}>
              {ignoring ? "Replacing..." : "Replace with Fallback"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
