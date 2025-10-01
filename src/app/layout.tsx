import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Wannes Persyn - Full Stack Developer",
  description: "Portfolio of Wannes Persyn, a passionate full stack developer specializing in building modern web applications.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning >
      <body>
        <ThemeProvider attribute="class">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
