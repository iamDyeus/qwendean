import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useRef } from "react";
import type { GenerationStatus } from "@/routes/app.$appId";
import loaderGif from "../../images/qwendean-animated.gif";

interface PreviewWindowProps {
  projectId: string;
  status: GenerationStatus;
}

const STATUS_MESSAGES: Record<Exclude<GenerationStatus, "done">, string> = {
  idle: "Start a conversation to build your landing page",
  understanding: "Understanding your requirements...",
  waiting_approval: "Waiting for your plan approval",
  generating: "Generating code...",
};

export function PreviewWindow({ projectId, status }: PreviewWindowProps) {
  const webviewRef = useRef<any>(null);

  const handleReload = () => {
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
  };

  if (status !== "done") {
    const isLoading = status === "understanding" || status === "generating";
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-muted gap-3">
        {isLoading && <img src={loaderGif} alt="Loading" className="size-12" />}
        <p className="text-muted-foreground text-sm">
          {STATUS_MESSAGES[status]}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-muted relative">
      <Button
        onClick={handleReload}
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-10 gap-2"
      >
        <RotateCw className="h-4 w-4" />
        Reload
      </Button>
      <webview
        ref={webviewRef}
        src={`http://localhost:3000/builds/${projectId}`}
        className="w-full h-full"
      />
    </div>
  );
}
