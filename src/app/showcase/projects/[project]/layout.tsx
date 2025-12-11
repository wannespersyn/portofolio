import "../../../../css/projects/projectInfo.css";

export const metadata = {
  title: "Project",
  description:
    "Portfolio of Wannes Persyn, a passionate full stack developer specializing in building modern web applications.",
};

export default function ProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="">
      {children}
    </section>
  );
}
