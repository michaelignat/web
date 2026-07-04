import { Footer } from "@/components/footer";
import { Navbar } from "@/components/nav/navbar";
import { NotFoundPage } from "@/components/not-found-page";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import appCss from "@/styles/index.css?url";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content: "A software engineer based in Perth, Australia.",
      },
      { title: "Michael Ignat" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Providers>
        <div className="relative flex min-h-screen flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </Providers>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Runs before paint to apply the persisted theme class.
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <HeadContent />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const themeScript = `
(() => {
  try {
    const theme = localStorage.getItem("theme") || "dark";
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  } catch {
    document.documentElement.classList.add("dark");
  }
})();
`;
