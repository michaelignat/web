import { cn } from "@/lib/utils";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "../theme/theme-toggle";
import { buttonVariants } from "../ui/button";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile.nav";

export const Navbar = () => (
  <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 max-w-screen-2xl items-center">
      <DesktopNav />
      <MobileNav />

      <nav className="flex flex-1 justify-end items-center space-x-1">
        <a
          href="https://github.com/michaelignat"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "h-8 w-8 px-0",
            )}
          >
            <GitHubLogoIcon className="size-4" />
            <span className="sr-only">GitHub</span>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/michaelignat/"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "h-8 w-8 px-0",
            )}
          >
            <LinkedInLogoIcon className="size-4" />
            <span className="sr-only">Twitter</span>
          </div>
        </a>

        <ThemeToggle />
      </nav>
    </div>
  </header>
);

export const navItems = [
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Projects",
    to: "/projects",
  },
] as const;
