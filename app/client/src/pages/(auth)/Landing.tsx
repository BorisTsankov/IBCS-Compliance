import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  LayoutPanelTop,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";

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
      "See the uploaded dashboard with detected chart regions highlighted directly in the interface.",
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
      "Drop in a PNG, JPG, PDF, PPTX, or DOCX file to begin the analysis.",
    icon: Upload,
  },
  {
    title: "Let Scoped inspect it",
    description:
      "Our pipeline processes the file, detects visual structures, and generates analysis output.",
    icon: LayoutPanelTop,
  },
  {
    title: "Review compliance feedback",
    description:
      "Open the result, inspect detections, and understand where the dashboard succeeds or fails.",
    icon: CheckCircle2,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm">
              <LayoutPanelTop className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Scoped</p>
              <p className="text-xs text-slate-400">IBCS Compliance Checker</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-600">
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
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
                <ShieldCheck className="h-4 w-4" />
                Built for dashboard quality review
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                Analyze dashboards for IBCS compliance with clarity.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
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
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">Fast</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Upload and review in seconds
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">Visual</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Detection preview included
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">Structured</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Feedback by category
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-xl">
                <div className="rounded-[24px] border border-slate-200 bg-[#f8f9fd] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Scoped Preview</p>
                      <h2 className="mt-1 text-xl font-semibold text-slate-900">
                        Dashboard Analysis
                      </h2>
                    </div>

                    <div className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                      Partial
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Score
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        72 / 100
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Confidence
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        0.88
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Result
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        Partial
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">
                        Detection Preview
                      </p>
                      <p className="text-xs text-slate-400">bar_chart detected</p>
                    </div>

                    <div className="flex h-64 items-center justify-center rounded-2xl bg-slate-100">
                      <div className="relative h-44 w-72 rounded-xl border-2 border-dashed border-slate-300 bg-white">
                        <div className="absolute left-12 top-8 h-24 w-12 rounded bg-violet-200" />
                        <div className="absolute left-28 top-16 h-16 w-12 rounded bg-violet-300" />
                        <div className="absolute left-44 top-4 h-28 w-12 rounded bg-violet-500" />
                        <div className="absolute inset-3 rounded-lg border-2 border-emerald-500" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900">
                          Layout & Positioning
                        </p>
                        <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-medium text-lime-700">
                          pass
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900">
                          Color & Contrast
                        </p>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                          warning
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900">
                          Information Hierarchy
                        </p>
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          fail
                        </span>
                      </div>
                    </div>
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
              <p className="text-sm font-medium text-violet-600">Features</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Everything in one review flow
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-8 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-violet-600">How it works</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                From upload to insight
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="rounded-3xl bg-slate-50 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-violet-700 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
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

export default Landing;