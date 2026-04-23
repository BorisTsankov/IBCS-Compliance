import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  LayoutPanelTop,
  Monitor,
  Moon,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Sun,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const features = [
  {
    title: "AI-powered dashboard review",
    description:
      "Upload your dashboard and get structured feedback on its visual compliance and layout quality.",
    icon: Sparkles,
  },
  {
    title: "Detection preview",
    description:
      "See uploaded dashboards with detected chart regions highlighted directly in the interface.",
    icon: ScanSearch,
  },
  {
    title: "Clear scoring system",
    description:
      "Understand results through compliance scores, confidence, and category-based feedback.",
    icon: BarChart3,
  },
];

const steps = [
  {
    title: "Upload your dashboard",
    description:
      "Add a PNG, JPG, PDF, PPTX, or DOCX file to begin the analysis.",
    icon: Upload,
  },
  {
    title: "Let Scoped inspect it",
    description:
      "The system processes the file, detects visual structures, and generates analysis output.",
    icon: LayoutPanelTop,
  },
  {
    title: "Review compliance feedback",
    description:
      "Inspect detections, scores, and feedback categories to understand the dashboard quality.",
    icon: CheckCircle2,
  },
];

const ThemeSwitcher = ({
  theme,
  setTheme,
}: {
  theme: "dark" | "light" | "system";
  setTheme: (theme: "dark" | "light" | "system") => void;
}) => {
  return (
    <div className="hidden grid-cols-3 gap-1 rounded-xl bg-accent p-1 sm:grid">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`rounded-lg p-2 transition ${
          theme === "light"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`rounded-lg p-2 transition ${
          theme === "dark"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Moon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`rounded-lg p-2 transition ${
          theme === "system"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
};

const Landing = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm">
              <LayoutPanelTop className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-foreground">
                Scoped
              </p>
              <p className="text-xs text-muted-foreground">
                IBCS Compliance Checker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher theme={theme} setTheme={setTheme} />

            <Link to="/login">
              <Button variant="ghost" className="text-muted-foreground">
                Log in
              </Button>
            </Link>

            <Link to="/register">
              <Button className="bg-violet-600 hover:bg-violet-700">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="px-6 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200">
                <ShieldCheck className="h-4 w-4" />
                Built for dashboard quality review
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Analyze dashboards for IBCS compliance with clarity.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Scoped helps teams upload dashboards, detect visual elements,
                and review structured compliance feedback in one clean workflow.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/register">
                  <Button className="h-12 rounded-xl bg-violet-600 px-6 text-base hover:bg-violet-700">
                    Start analyzing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl px-6 text-base"
                  >
                    Log in
                  </Button>
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {["Fast", "Visual", "Structured"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border bg-card p-4 shadow-sm"
                  >
                    <p className="text-2xl font-bold text-foreground">{item}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item === "Fast"
                        ? "Upload and review quickly"
                        : item === "Visual"
                          ? "Detection preview included"
                          : "Feedback by category"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] border bg-card p-5 shadow-xl">
                <div className="rounded-[24px] border bg-accent p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Scoped Preview
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-foreground">
                        Dashboard Analysis
                      </h2>
                    </div>

                    <div className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
                      Partial
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Score", "72 / 100"],
                      ["Confidence", "0.88"],
                      ["Result", "Partial"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-card p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {label}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-foreground">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border bg-card p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        Detection Preview
                      </p>
                      <p className="text-xs text-muted-foreground">
                        bar_chart detected
                      </p>
                    </div>

                    <div className="flex h-64 items-center justify-center rounded-2xl bg-accent">
                      <div className="relative h-44 w-72 rounded-xl border-2 border-dashed bg-card">
                        <div className="absolute left-12 top-8 h-24 w-12 rounded bg-violet-200" />
                        <div className="absolute left-28 top-16 h-16 w-12 rounded bg-violet-300" />
                        <div className="absolute left-44 top-4 h-28 w-12 rounded bg-violet-500" />
                        <div className="absolute inset-3 rounded-lg border-2 border-emerald-500" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <FeedbackPreview title="Layout & Positioning" status="pass" />
                    <FeedbackPreview title="Color & Contrast" status="warning" />
                    <FeedbackPreview title="Information Hierarchy" status="fail" />
                  </div>
                </div>
              </div>

              <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-violet-200/40 blur-2xl md:block" />
              <div className="absolute -right-6 bottom-10 hidden h-24 w-24 rounded-full bg-fuchsia-200/40 blur-2xl md:block" />
            </div>
          </div>
        </section>

        <section className="px-6 py-8 md:px-8 md:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-medium text-violet-600 dark:text-violet-300">
                Features
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                Everything in one review flow
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-3xl border bg-card p-6 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-8 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl rounded-[32px] border bg-card p-8 shadow-sm md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-violet-600 dark:text-violet-300">
                How it works
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                From upload to insight
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="rounded-3xl bg-accent p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card text-violet-700 shadow-sm dark:text-violet-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-8 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[32px] bg-violet-600 px-8 py-12 text-center text-white shadow-xl md:px-12">
            <p className="text-sm font-medium text-violet-100">
              Ready to get started?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Upload your first dashboard and review it with Scoped.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-violet-100">
              Sign up to start analyzing dashboard layouts, chart elements, and
              feedback categories in a cleaner workflow.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/register">
                <Button className="h-12 rounded-xl bg-white px-6 text-base text-violet-700 hover:bg-violet-50">
                  Create account
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10"
                >
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const FeedbackPreview = ({
  title,
  status,
}: {
  title: string;
  status: "pass" | "warning" | "fail";
}) => {
  const statusStyles =
    status === "pass"
      ? "bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-200"
      : status === "warning"
        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
        : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-200";

  return (
    <div className="rounded-2xl bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default Landing;