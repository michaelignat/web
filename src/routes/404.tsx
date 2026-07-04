import { NotFoundPage } from "@/components/not-found-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "Page not found - Michael Ignat" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});
