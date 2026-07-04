import { PageContainer } from "@/components/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Michael Ignat" },
      {
        name: "description",
        content:
          "I'm Michael Ignat. A software engineer from Perth, Australia.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-6">
        <div className="row-span-2">
          <h1 className="font-bold text-4xl tracking-tight sm:text-5xl">
            Michael.
          </h1>

          <div className="mt-6 space-y-7 text-base text-muted-foreground">
            <p>
              An engineer from Perth, Australia with a simple goal:
              <span className="inline-block font-semibold text-foreground/90">
                To design solutions that are unique and stand out.
              </span>
            </p>

            <p>
              I treat engineering as an art form. To be able to create something
              that simply once existed as an idea is a uniquely rewarding
              experience. I love the feeling of seeing something I've created
              come to life.
            </p>

            <p>
              The true skill of an engineer lies in their ability to pick up new
              technologies. There's always a new framework, a new language, a
              new tool. Being able to adapt and learn quickly is something that
              I take pride in and feel as though is often overlooked by many in
              the industry.
            </p>

            <p>
              I aim to surround myself with like-minded people, who are
              passionate about what they do and aren't looking for the easy way
              out.
            </p>
          </div>
        </div>

        <div className="lg:pl-20">
          <div className="max-w-xs lg:mt-20 lg:max-w-none">
            <img
              src="/images/me.jpeg"
              alt="Michael Ignat"
              width={300}
              height={300}
              className="rounded-2xl"
            />
          </div>

          <a
            href="mailto:michael@michaelignat.com.au"
            className={cn(buttonVariants({ variant: "link" }), "mt-4 pl-0")}
          >
            Send me an email
          </a>
        </div>
      </div>
    </PageContainer>
  );
}
