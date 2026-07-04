import { PageContainer } from "@/components/page-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

const projects = [
  {
    name: "Catena",
    technologies:
      "React Native (Expo), AI SDK, Braintrust, CF Workers, PostgreSQL",
    description:
      "Cycling coach that gives riders personalised training guidance to help them improve.",
    href: "https://catena.bike/",
    image: { href: "/images/catena.svg", width: 20, height: 20 },
  },
  {
    name: "Struo",
    technologies: "Tanstack Start, Tailwind, Figma",
    description:
      "My web consulting agency that helps companies grow through innovative solutions.",
    href: "https://struo.dev/",
    image: { href: "/images/struo.svg", width: 15, height: 15 },
  },
  {
    name: "No_Ops",
    technologies: "React, Tailwind, Go, GraphQL, PostgreSQL",
    description:
      "AWS wrapper that abstracts DevOps, making it easier for developers to deploy products.",
    href: "https://www.getnoops.com/",
    image: { href: "/images/noops.svg", width: 20, height: 20 },
  },
  {
    name: "Inflow",
    technologies: "React, Tailwind, Go, PostgreSQL",
    description:
      "Payment service that allows for easy monetary transactions to be sent to different vendors.",
    href: "https://www.myinflow.com/",
    image: { href: "/images/inflow.svg", width: 15, height: 15 },
  },
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects - Michael Ignat" },
      {
        name: "description",
        content: "Things I've made trying to put my dent in the universe.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <PageContainer className="flex flex-col gap-y-8 lg:gap-y-16">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-bold text-4xl tracking-tight sm:max-w-2xl sm:text-5xl">
          Work.
        </h1>

        <span className="text-muted-foreground">
          A collection of projects that showcase my passion for engineering.
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.name}>
            <a href={project.href} target="_blank" rel="noreferrer">
              <Card className={cn("transition-transform hover:scale-[1.0125]")}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                      <img
                        src={project.image.href}
                        alt={project.name}
                        width={project.image.width}
                        height={project.image.height}
                      />

                      <CardTitle>{project.name}</CardTitle>
                    </div>
                  </div>

                  <CardDescription>{project.technologies}</CardDescription>
                </CardHeader>

                <CardContent className="text-sm">
                  {project.description}
                </CardContent>
              </Card>
            </a>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
