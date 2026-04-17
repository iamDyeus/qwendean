import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";

export default async function BuildPage({
  params,
}: {
  params: { buildId: string };
}) {
  const buildId = params.buildId;
  const buildPath = path.join(process.cwd(), "app", "builds", "[buildId]", buildId, "page.tsx");

  try {
    await fs.access(buildPath);
  } catch {
    notFound();
  }

  const PageComponent = (await import(`./${buildId}/page`)).default;

  return <PageComponent />;
}

export async function generateStaticParams() {
  const buildsDir = path.join(process.cwd(), "app", "builds", "[buildId]");

  try {
    const entries = await fs.readdir(buildsDir);
    const dirs = await Promise.all(
      entries.map(async (entry) => {
        const stat = await fs.stat(path.join(buildsDir, entry));
        return stat.isDirectory() ? entry : null;
      })
    );
    return dirs.filter(Boolean).map((buildId) => ({ buildId }));
  } catch {
    return [];
  }
}
