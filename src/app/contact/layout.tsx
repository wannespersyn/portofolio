export const metadata = {
  title: "Contact - Wannes Persyn",
  description:
    "Portfolio of Wannes Persyn, a passionate full stack developer specializing in building modern web applications.",
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="">
      {children}
    </section>
  );
}
