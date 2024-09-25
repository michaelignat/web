import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default () => (
  <div className="container flex h-[calc(100vh-11rem)] items-center justify-center">
    <div className="space-y-4 flex flex-col items-center">
      <p className="font-semibold text-muted-foreground">404</p>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>

      <p className="text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <Link
        href="/"
        className={buttonVariants({
          variant: "secondary",
        })}
      >
        Go back home
      </Link>
    </div>
  </div>
);
