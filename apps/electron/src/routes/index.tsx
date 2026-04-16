import { createFileRoute, Navigate } from "@tanstack/react-router";

function HomePage() {
  return <Navigate to="/apps" />;
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
