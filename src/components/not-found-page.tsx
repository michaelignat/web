import { buttonVariants } from "./ui/button";

export const NotFoundPage = () => (
  <div className="container flex h-[calc(100vh-11rem)] items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <p className="font-semibold text-muted-foreground">404</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="text-muted-foreground">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <a href="/" className={buttonVariants({ variant: "secondary" })}>
        Go back home
      </a>
    </div>
  </div>
);
