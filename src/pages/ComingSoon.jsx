import { ArrowLeft, ArrowUpRight, BookOpen, Check, LineChart, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const EASE = [0.22, 1, 0.36, 1];

const EXPECT = [
  {
    icon: BookOpen,
    title: "Structured lessons",
    text: "A clear step-by-step path, from fundamentals to confident execution.",
  },
  {
    icon: LineChart,
    title: "Real market examples",
    text: "Learn from live charts and practical setups, not just theory.",
  },
  {
    icon: Users,
    title: "Guided support",
    text: "Mentor-led learning so your questions never go unanswered.",
  },
];

const PROGRESS = [
  { label: "Curriculum planned", done: true },
  { label: "Lessons being prepared", done: true },
  { label: "Final review", done: false },
];

const BARS = [34, 52, 43, 68, 56, 76, 61, 88, 70, 96, 78, 100];

export default function ComingSoon() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "Trading education";
  const reduce = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE },
  });

  return (
    <div
      data-testid="coming-soon-page"
      className="min-h-screen overflow-hidden bg-[#050505] text-paper"
    >
      <Navbar />
      <main className="relative border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 chart-grid-bg opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]"
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          {/* Left: message + actions */}
          <div>
            <motion.div
              {...rise(0)}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                One Stock Academy <span className="text-white/30">/</span> Coming soon
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="max-w-3xl font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            >
              A clearer view of the market is{" "}
              <span className="italic text-pop">on its way.</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-7 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl"
            >
              We&apos;re putting the finishing touches on a learning experience
              for{" "}
              <span className="rounded-md border border-brand/40 bg-brand/10 px-2 py-0.5 text-white">
                {topic}
              </span>
              . In the meantime, there&apos;s plenty to explore.
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                to="/#courses"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore current programs
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </motion.div>

            <motion.div {...rise(0.32)} className="mt-6">
              <Link
                to="/blog"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Or read our latest market insights →
              </Link>
            </motion.div>
          </div>

          {/* Right: progress card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className="relative rounded-2xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur sm:p-8 lg:ml-6"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                In development
              </p>
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {topic}
              </span>
            </div>

            <div
              className="flex h-40 items-end gap-2 sm:gap-3"
              aria-hidden="true"
            >
              {BARS.map((height, index) => (
                <motion.span
                  key={`${height}-${index}`}
                  initial={reduce ? false : { scaleY: 0.2, opacity: 0.25 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.25 + index * 0.035,
                    ease: EASE,
                  }}
                  className={`flex-1 origin-bottom rounded-t-sm border-t ${
                    index > 8
                      ? "border-brand/70 bg-brand/15"
                      : "border-white/30 bg-white/[0.05]"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
              {PROGRESS.map((step) => (
                <li key={step.label} className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      step.done
                        ? "border-brand bg-brand text-black"
                        : "border-white/25 text-transparent"
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span
                    className={`text-sm ${
                      step.done ? "text-white" : "text-white/50"
                    }`}
                  >
                    {step.label}
                  </span>
                  {!step.done && (
                    <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.16em] text-brand">
                      Up next
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* What to expect */}
        <div className="relative mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:pb-28">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            What to expect
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {EXPECT.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-brand/50 hover:bg-white/[0.04]"
              >
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-brand transition-colors group-hover:border-brand/60">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}