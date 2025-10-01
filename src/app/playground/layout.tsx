export const metadata = {
  title: "Playground",
  description:
    "Portfolio of Wannes Persyn, a passionate full stack developer specializing in building modern web applications.",
};

export default function PlaygroundLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      {children}
    </section>
  );
}
