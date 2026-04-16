import { Button } from '@/components/ui/button'
import { RotateCw } from 'lucide-react'
import { useRef } from 'react'

interface PreviewWindowProps {
  projectId: string;
}

export function PreviewWindow({ projectId }: PreviewWindowProps) {
  const webviewRef = useRef<any>(null)

  const handleReload = () => {
    if (webviewRef.current) {
      webviewRef.current.reload()
    }
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
