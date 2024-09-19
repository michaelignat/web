import { Footer } from "@/components/footer";
import { Navbar } from "@/components/nav/navbar";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Michael Ignat",
    default: "Michael Ignat",
  },
  description:
    "A software engineer based in Perth, looking to build products that truly make a difference.",
};

export default ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <html lang="en">
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        GeistSans.variable,
      )}
    >
      <Providers>
        <div className="relative flex min-h-screen flex-col bg-background">
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </Providers>
    </body>
  </html>
);
