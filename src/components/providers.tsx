import { ThemeProvider } from "./theme/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    disableTransitionOnChange
    defaultTheme="dark"
  >
    {children}
  </ThemeProvider>
);
