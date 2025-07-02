// src/app/head.tsx
export default function Head() {
  return (
    <>
      <title>My AstroMood</title>
      <meta name="description" content="Stars in the palm of your hand" />

      {/* Favicon clair */}
      <link
        rel="icon"
        href="/favicon-light.png"
        media="(prefers-color-scheme: light)"
      />

      {/* Favicon sombre */}
      <link
        rel="icon"
        href="/favicon-dark.png"
        media="(prefers-color-scheme: dark)"
      />

      {/* Fallback pour les vieux navigateurs */}
      <link rel="icon" href="/favicon-light.png" />
    </>
  );
}
