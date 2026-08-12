import { cn } from "@/lib/utils";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "../theme/theme-toggle";
import { buttonVariants } from "../ui/button";

export const Navbar = () => (
  <header className="w-full bg-background">
    <div className="mx-auto flex h-16 w-full max-w-[620px] items-center justify-between px-6 sm:px-0">
      <a
        href="/"
        className="text-[16px] font-semibold leading-5 tracking-[-0.02em] text-foreground"
      >
        michaelignat
      </a>

      <nav className="flex items-center space-x-1" aria-label="External links">
        <a
          href="https://github.com/michaelignat"
          target="_blank"
          rel="noreferrer"
        >
          <span
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-8 w-8 px-0",
            )}
          >
            <GitHubLogoIcon className="size-4" />
            <span className="sr-only">GitHub</span>
          </span>
        </a>

        <a
          href="https://www.linkedin.com/in/michaelignat/"
          target="_blank"
          rel="noreferrer"
        >
          <span
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-8 w-8 px-0",
            )}
          >
            <LinkedInLogoIcon className="size-4" />
            <span className="sr-only">LinkedIn</span>
          </span>
        </a>

        <ThemeToggle />
      </nav>
    </div>
  </header>
);
