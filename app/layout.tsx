import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdurehman Sualih | Full Stack & Mobile App Developer",
  description:
    "Building scalable web apps with Next.js & Laravel and mobile apps with Flutter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script runs before paint to apply the correct theme class,
            preventing a flash of the wrong theme on load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isDark = stored !== null ? stored === 'dark' : true;
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
