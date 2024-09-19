import { PageContainer } from "@/components/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "I’m Michael Ignat. A software engineer from Perth, Australia.",
};

export default () => {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-6">
        <div className="row-span-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Michael.
          </h1>

          <div className="mt-6 space-y-7 text-base text-muted-foreground">
            <p>
              A software engineer from Perth, Australia with a simple goal:
              <span className="inline-block font-semibold text-foreground/90">
                To design solutions that are unique and stand out.
              </span>
            </p>

            <p>
              I treat engineering as an art form. To be able to create something
              that simply once existed as an idea is a truly rewarding
              experience. I love the feeling of seeing something I've created
              come to life.
            </p>

            <p>
              The true skill of a software engineer lies in their ability to
              pick up new technologies. There's always a new framework, a new
              language, a new tool - being able to adapt and learn quickly is
              something that I take pride in and also feel as though is
              overlooked by many in the industry.
            </p>

            <p>
              I aim to surround myself with like-minded people who achieve their
              best each and every single day, both physically and mentally. An
              extremely rare trait to find in people is passion. It's something
              that I hold in high regard and something that I look for in
              everyone I work with.
            </p>

            <p>
              I'm always looking for interesting projects to work on, don't
              hesitate to reach out ✌️
            </p>
          </div>
        </div>

        <div className="lg:pl-20">
          <div className="max-w-xs lg:max-w-none lg:mt-20">
            <Image
              src="/assets/me.jpeg"
              alt="Michael Ignat"
              sizes="29rem"
              width={495}
              height={495}
              className="h-auto w-auto rounded-2xl"
            />
          </div>

          <Link
            href="mailto:michael@michaelignat.com.au"
            className={cn(buttonVariants({ variant: "link" }), "mt-4 pl-0")}
          >
            Send me an email ✉️
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
