import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Warp } from "@paper-design/shaders-react";
import { ArrowRightIcon, Link2Icon } from "@radix-ui/react-icons";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container relative flex h-full items-center justify-center">
      <Warp
        className="pointer-events-none fixed inset-0 h-full w-full opacity-50"
        colors={["#000000", "#d2a76a", "#000000"]}
        proportion={0.3}
        softness={1}
        distortion={0.21}
        swirl={0.57}
        swirlIterations={10}
        shape="edge"
        shapeScale={0.75}
        speed={1.6}
        scale={1.2}
      />

      <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-6">
        <h1 className="z-10 text-center font-bold text-2xl tracking-tight sm:text-4xl sm:text-[2.25rem]">
          No artist tolerates reality.
        </h1>

        <div className="flex space-x-6">
          <a
            href="/MICHAEL_IGNAT_RESUME_2025.pdf"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "z-10 sm:h-9 sm:px-4 sm:py-2",
            )}
          >
            View Resume <Link2Icon className="ml-2" />
          </a>

          <Link
            to="/projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "z-10 sm:h-9 sm:px-4 sm:py-2",
            )}
          >
            See projects <ArrowRightIcon className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
