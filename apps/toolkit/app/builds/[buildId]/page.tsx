import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";

export default async function BuildPage({
  params,
}: {
  params: { buildId: string };
}) {
  const buildId = params.buildId;
  const buildPath = path.join(process.cwd(), "app", "builds", buildId, "page.tsx");

  try {
    await fs.access(buildPath);
  } catch {
    notFound();
  }

  // Dynamically import the page component
  const PageComponent = (await import(`@/app/builds/${buildId}/page`)).default;

  return <PageComponent />;
}

export async function generateStaticParams() {
  const buildsDir = path.join(process.cwd(), "app", "builds");
  
  try {
    const builds = await fs.readdir(buildsDir);
    return builds
      .filter(async (build) => {
        const stat = await fs.stat(path.join(buildsDir, build));
        return stat.isDirectory();
      })
      .map((build) => ({
        buildId: build,
      }));
  } catch {
    return [];
  }
}
