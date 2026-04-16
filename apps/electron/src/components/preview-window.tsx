interface PreviewWindowProps {
  projectId: string;
}

export function PreviewWindow({ projectId }: PreviewWindowProps) {
  return (
    <div className="flex-1 flex flex-col bg-muted">
      <webview 
        src={`http://localhost:3000/builds/${projectId}`}
        className="w-full h-full"
      />
    </div>
  );
}
