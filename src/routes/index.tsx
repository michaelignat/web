import { createFileRoute } from "@tanstack/react-router";

const projects = [
  {
    name: "Struo",
    description:
      "Software agency which helps companies grow through innovative solutions.",
    href: "https://struo.dev/",
  },
  {
    name: "Catena",
    description:
      "Cycling coach providing personalised training guidance through AI.",
    href: "https://catena.bike/",
  },
  {
    name: "No_Ops",
    description:
      "DevOps platform simplifying AWS infrastructure to deploy applications faster.",
    href: "https://www.getnoops.com/",
  },
  {
    name: "Inflow",
    description:
      "Payment service enabling seamless transactions with multiple vendors.",
    href: "https://www.myinflow.com/",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michael Ignat" },
      {
        name: "description",
        content:
          "Michael Ignat is a software engineer based in Perth, Australia.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="mx-auto w-full max-w-[620px] px-6 pt-16 pb-24 sm:px-0">
      <section className="flex flex-col gap-[82px] pb-[82px]">
        <div className="flex flex-col gap-3">
          <h1 className="section-title">Now</h1>
          <p className="body-copy">
            I&apos;m working at{" "}
            <a
              href="https://ailo.io/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Ailo
            </a>{" "}
            in the fintech team. I&apos;ve worked on a range of different
            products during my career with a particular interest in design
            engineering.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="section-title">Resume</h2>
          <a
            href="/IGNAT_MICHAEL_CV_2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="body-copy underline underline-offset-4"
          >
            You can view my full experience here ↗
          </a>
        </div>
      </section>

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="section-title">
          Projects
        </h2>

        <div className="mt-3 flex flex-col">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="project-card relative isolate flex w-full flex-col gap-3 py-3 no-underline"
            >
              <span className="project-title">{project.name}</span>
              <span className="body-copy">{project.description}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
