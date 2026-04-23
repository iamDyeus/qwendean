import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import type React from "react";

export const dynamic = 'force-dynamic';

const BUILDS_DIR = process.env.BUILDS_DIR ?? path.join(process.cwd(), "builds");
const APP_BUILDS_DIR = process.env.APP_BUILDS_DIR ?? path.join(process.cwd(), "app", "builds", "[buildId]");

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ buildId: string }>;
}) {
  const { buildId } = await params;
  const sourcePath = path.join(BUILDS_DIR, buildId);
  const destPath = path.join(APP_BUILDS_DIR, buildId);

  try {
    await fs.access(sourcePath);
  } catch {
    notFound();
  }

  await copyDir(sourcePath, destPath);

  let PageComponent: React.ComponentType;
  try {
    ({ default: PageComponent } = await import(`./${buildId}/page`));
  } catch (e: any) {
    if (e?.code !== "MODULE_NOT_FOUND") throw e;
    await new Promise((r) => setTimeout(r, 500));
    ({ default: PageComponent } = await import(`./${buildId}/page`));
  }
  return <PageComponent />;
}
