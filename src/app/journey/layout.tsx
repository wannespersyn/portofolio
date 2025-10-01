export const metadata = {
  title: "Journey - Wannes Persyn",
  description:
    "Portfolio of Wannes Persyn, a passionate full stack developer specializing in building modern web applications.",
};

export default function JourneyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      {children}
    </section>
  );
}
