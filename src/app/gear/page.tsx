import { PageContainer } from "@/components/page-container";
import { LinePattern } from "@/components/patterns/line-pattern";
import { Timeline, type TimelineEntry } from "@/components/timeline";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export const metadata = {
  title: "Gear",
  description: "Software I use, gadgets I love, and other things I recommend.",
};

export default () => (
  <PageContainer className="flex flex-col gap-y-8 lg:gap-y-16">
    <div className="flex flex-col gap-y-2">
      <h1 className="tracking-tight text-4xl font-bold sm:text-5xl sm:max-w-2xl">
        Equipment.
      </h1>

      <span className="text-muted-foreground">
        The things I use to build software and stay productive.
      </span>
    </div>

    <Timeline entries={timelineEntries} />

    <div className="py-96 relative left-[50%] right-[50%] mx-[-51vw] w-screen h-[50vh] overflow-hidden">
      <LinePattern className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/95" />

      <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
        fin.
      </span>
    </div>
  </PageContainer>
);

interface ToolProps extends PropsWithChildren {
  title: string;
}

const Tool = ({ title, children }: ToolProps) => (
  <Card>
    <CardHeader className="space-y-2">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{children}</CardDescription>
    </CardHeader>
  </Card>
);

const timelineEntries: TimelineEntry[] = [
  {
    title: "Workstation",
    content: (
      <div className="mt-4 space-y-12">
        <Tool title="Asus Zenbook 14 OLED">
          My go-to for both on-the-go work and at-home productivity. It handles
          all of my coding needs with ease. The compact form factor makes it
          perfect for travel, while still providing enough screen real estate
          for comfortable daily use.
        </Tool>

        <Tool title='49" Odyssey OLED G93SC Curved Monitor'>
          Got rid of my three 24" monitors and got this. 240HZ, OLED, 0.03ms
          response, must anything else be said.
        </Tool>

        <Tool title="Higround Performance 65 Keyboard">
          The 65% layout is perfect for my workflow, offering a compact design
          without sacrificing essential keys.
        </Tool>

        <Tool title="Secretlab TITAN Evo">
          Can definitely find cheaper chairs that are the same or better
          quality, but I've had this for years and it's still going strong.
          Premium build quality and durability make it a worthwhile investment
          for anyone spending extended hours at their desk.
        </Tool>
      </div>
    ),
  },
  {
    title: "Development Tools",
    content: (
      <div className="mt-4 space-y-12">
        <Tool title="Cursor">
          Recently switched from VS Code. The built-in AI helps me write code
          faster, explain complex functions, and even refactor entire
          components. I've been using Claude 3.5 Sonnet and it's been amazing,
          better than GitHub Copilot so far.
        </Tool>

        <Tool title="Ubuntu (WSL)">
          I should probably just switch to Linux permanently, but using Ubuntu
          via WSL in Windows Terminal has been doing me fine - pairing it with
          fish shell autocomplete and aliases speeds up my workflow
          significantly.
        </Tool>

        <Tool title="Thunder Client">
          Lightweight version of Postman that's built into VSCode, nothing else
          comes close 🤷‍♂️
        </Tool>

        <Tool title="Biome">
          Not exactly a tool, but thought I'd mention that I'm using Biome as my
          linter/formatter over prettier on all my projects now. It's insanely
          fast and the default configuration is already great.
        </Tool>
      </div>
    ),
  },
  {
    title: "Design",
    content: (
      <Tool title="Figma">
        The powerful design capabilities for when I'm wireframing ideas or
        designing interface layouts make it indispensable for both quick mockups
        and detailed designs. The ability to create reusable components and
        easily share prototypes with clients has streamlined my design workflow
        significantly.
      </Tool>
    ),
  },
  {
    title: "Productivity",
    content: (
      <div className="mt-4 space-y-12">
        <Tool title="Obsidian">
          Perfect for organizing thoughts, research, and project documentation.
          The Zettelkasten method is a game changer, and Obsidian makes it so
          makes it so easy to keep all of my notes in one place.
          <Link
            href="https://www.youtube.com/watch?v=hSTy_BInQs8"
            className="ml-1 mt-2 inline-block text-foreground hover:underline"
            target="_blank"
          >
            Check out this highly recommended video
          </Link>
        </Tool>

        <Tool title="Toggl">
          Mostly used when consulting and charging billable hours (or to see how
          long something takes). The collaborative features are great for
          managing projects and sharing time entries with my business partner.
        </Tool>

        <Tool title="Slack">100x better than Teams.</Tool>
      </div>
    ),
  },
];
