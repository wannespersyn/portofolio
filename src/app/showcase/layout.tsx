import './style.css';

export const metadata = {
  title: "Projects - Wannes Persyn",
  description:
    "Portfolio of Wannes Persyn, a passionate full stack developer specializing in building modern web applications.",
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="">
      {children}
    </section>
  );
}
