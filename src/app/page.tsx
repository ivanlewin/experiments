import Link from "next/link";

const EXPERIMENTS = [
  {
    name: "Speedometer",
    href: "/experiments/speedometer",
  },
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul className="text-center sm:text-left">
          {EXPERIMENTS.map((experiment) => (
            <li key={experiment.href} className="mb-2">
              <Link href={experiment.href}>{experiment.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
