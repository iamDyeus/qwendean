import { createFileRoute } from "@tanstack/react-router";

function AppsPage() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">My Apps</h1>
      <p className="text-muted-foreground">
        All your apps will be listed here
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="border rounded-lg p-6 hover:bg-accent cursor-pointer">
          <h3 className="font-semibold mb-2">User App Name</h3>
          <p className="text-sm text-muted-foreground">
            Your chat application
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/apps")({
  component: AppsPage,
});
