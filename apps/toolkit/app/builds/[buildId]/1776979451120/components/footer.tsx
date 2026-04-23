"use client";

function Footer() {
  return (
    <section style={{ padding: "2rem", background: "#1a1a1a", color: "#f87171", fontFamily: "monospace", textAlign: "center" }}>
      <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>⚠️ footer.tsx failed to render</p>
      <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>An error occurred during generation.</p>
      <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.5rem" }}>Open the plan editor, update the prompt for this section and click Regenerate.</p>
    </section>
  );
}

export { Footer };
