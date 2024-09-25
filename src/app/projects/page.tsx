import type { Metadata } from "next";

import { PageContainer } from "@/components/page-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "Environment Toolkit",
    technologies: "Next, Tailwind, Go, PostgreSQL",
    description:
      "A declarative CDK powered by Terraform to assist with the creation of infrastructure.",
    href: "https://github.com/envtio/", // TODO: update to https://hub.envt.io/ when done
    image: "/images/envt.webp",
    inProgress: true,
  },
  {
    name: "Struo",
    technologies: "Next, Serwist, Tailwind, PostgreSQL, Figma",
    description:
      "A web consulting agency that I run with my business partner helping businesses grow through technology.",
    href: "https://struo.dev/",
    image: "/images/struo.svg",
  },
  {
    name: "No_Ops",
    technologies: "React, Tailwind, Go, GraphQL, PostgreSQL",
    description:
      "An AWS wrapper that abstracts DevOps, making it easier for developers to deploy products.",
    href: "https://www.getnoops.com/",
    image: "/images/noops.svg",
  },

  {
    name: "Inflow",
    technologies: "React, Tailwind, Go, PostgreSQL",
    description:
      "A payment service that allows for easy monetary transactions to be sent to different vendors.",
    href: "https://www.myinflow.com/",
    image: "/images/inflow.svg",
  },
];

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I’ve made trying to put my dent in the universe.",
};

export default () => (
  <PageContainer className="flex flex-col gap-y-8 lg:gap-y-16">
    <div className="flex flex-col gap-y-2">
      <h1 className="tracking-tight text-4xl font-bold sm:text-5xl sm:max-w-2xl">
        Work.
      </h1>

      <span className="text-muted-foreground">
        A collection of projects that showcase my passion for engineering.
      </span>
    </div>

    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.name} href={project.href} target="_blank">
          <Card
            className={cn(
              "transition-transform hover:scale-[1.0125]",
              project.inProgress &&
                "border-amber-500/30 bg-amber-300/10 dark:border-amber-400/30 dark:bg-amber-900/10",
            )}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={20}
                    height={20}
                  />

                  <CardTitle>{project.name}</CardTitle>
                </div>

                {project.inProgress && (
                  <span className="text-amber-500 text-sm dark:text-amber-400">
                    In progress
                  </span>
                )}
              </div>

              <CardDescription>{project.technologies}</CardDescription>
            </CardHeader>

            <CardContent className="text-sm">{project.description}</CardContent>
          </Card>
        </Link>
      ))}
    </ul>
  </PageContainer>
);
