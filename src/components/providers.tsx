import { ThemeProvider } from "./theme/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
);
