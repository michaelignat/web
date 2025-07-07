import { MovingParticleSphere } from "@/components/particle-background";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default () => (
  <div className="container relative flex items-center h-full justify-center">
    <MovingParticleSphere />

    <div className="flex items-center justify-center flex-col space-y-4 h-[calc(100vh-10rem)]">
      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl sm:text-[2.25rem] text-center z-10">
        No artist tolerates reality.
      </h1>

      <div className="flex space-x-6">
        <Link
          href="/IGNATmichael_Resume_2025.pdf"
          target="_blank"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "z-10 sm:h-9 sm:px-4 sm:py-2",
          )}
        >
          View Resume <Link2Icon className="ml-2" />
        </Link>

        <Link
          href="/projects"
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
