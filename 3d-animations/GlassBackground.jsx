import React from "react";

/**
 * Obsidian Luxury Glass Background Component
 * Deep obsidian (#020204) base with subtle electric indigo (#6366f1)
 * and muted premium cyan (#5eead4) ambient refraction.
 */
export default function GlassBackground() {
  return (
    <div
      className="obsidian-glass-backdrop"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: "#020204",
        backgroundImage: `
          radial-gradient(circle at 82% 12%, rgba(99, 102, 241, 0.09) 0%, transparent 48%),
          radial-gradient(circle at 14% 78%, rgba(94, 234, 212, 0.06) 0%, transparent 45%),
          linear-gradient(to right, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.018) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 64px 64px, 64px 64px",
      }}
    />
  );
}
