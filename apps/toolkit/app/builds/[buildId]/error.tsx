"use client";

export default function BuildError({ error }: { error: Error }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", color: "red", whiteSpace: "pre-wrap" }}>
      Build error:{"\n"}{error.message}
    </div>
  );
}
