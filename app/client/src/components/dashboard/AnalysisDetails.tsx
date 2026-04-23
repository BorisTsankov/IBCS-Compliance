import { type DashboardAnalysis } from "@/lib/api";

type AnalysisDetailsProps = {
  analysis: DashboardAnalysis | null;
};

const AnalysisDetails = ({ analysis }: AnalysisDetailsProps) => {
  if (!analysis) {
    return (
      <div className="flex min-h-105 items-center justify-center rounded-xl border border-dashed bg-card p-6 text-sm text-muted-foreground shadow-sm">
        Upload a dashboard or select one from your history.
      </div>
    );
  }

  const resultLabel = analysis.overall_result
    ? analysis.overall_result.replaceAll("_", " ")
    : "Unknown";

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">Selected dashboard</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground">
              {analysis.original_filename}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {analysis.summary ?? "No summary available."}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-accent p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Result
                </p>
                <p className="mt-2 text-sm font-semibold capitalize text-foreground">
                  {resultLabel}
                </p>
              </div>

              <div className="rounded-xl bg-accent p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Score
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {analysis.overall_score ?? "-"} / 100
                </p>
              </div>

              <div className="rounded-xl bg-accent p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Confidence
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {analysis.confidence ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">Details</p>

            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  File type
                </p>
                <p className="mt-1 text-foreground">{analysis.file_type}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Size
                </p>
                <p className="mt-1 text-foreground">
                  {(analysis.file_size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Status
                </p>
                <p className="mt-1 capitalize text-foreground">
                  {analysis.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {analysis.annotated_image_path && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Detection Preview
            </h3>

            <div className="overflow-hidden rounded-2xl border bg-accent">
              <img
                src={`http://127.0.0.1:8000/${analysis.annotated_image_path}`}
                alt="Detected dashboard"
                className="w-full object-contain"
              />
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Feedback categories
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {analysis.feedback_json?.map((item) => {
              const statusStyles =
                item.status === "pass"
                  ? "bg-lime-100 text-lime-800 dark:bg-lime-500/20 dark:text-lime-200"
                  : item.status === "warning"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200"
                    : "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200";

              const barStyles =
                item.status === "pass"
                  ? "bg-lime-500"
                  : item.status === "warning"
                    ? "bg-amber-400"
                    : "bg-red-500";

              return (
                <div
                  key={`${analysis.id}-${item.category}`}
                  className="rounded-2xl border bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                      <h4 className="mt-1 text-lg font-semibold text-foreground">
                        Output
                      </h4>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {item.message}
                  </p>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Score</span>
                      <span>{item.score}/100</span>
                    </div>
                    <div className="h-2 rounded-full bg-accent">
                      <div
                        className={`h-2 rounded-full ${barStyles}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisDetails;