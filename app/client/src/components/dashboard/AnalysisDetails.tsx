import { type DashboardAnalysis } from "@/lib/api";

type AnalysisDetailsProps = {
  analysis: DashboardAnalysis | null;
};

const AnalysisDetails = ({ analysis }: AnalysisDetailsProps) => {
  if (!analysis) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
        Upload a dashboard or select one from your history.
      </div>
    );
  }

  const resultLabel = analysis.overall_result
    ? analysis.overall_result.replaceAll("_", " ")
    : "Unknown";

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-400">Selected dashboard</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              {analysis.original_filename}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {analysis.summary ?? "No summary available."}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Result
                </p>
                <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
                  {resultLabel}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Score
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {analysis.overall_score ?? "-"} / 100
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Confidence
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {analysis.confidence ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-400">Details</p>

            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  File type
                </p>
                <p className="mt-1">{analysis.file_type}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Size
                </p>
                <p className="mt-1">
                  {(analysis.file_size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <p className="mt-1 capitalize">{analysis.status}</p>
              </div>
            </div>
          </div>
        </div>

        {analysis.annotated_image_path && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Detection Preview
            </h3>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={`http://127.0.0.1:8000/${analysis.annotated_image_path}`}
                alt="Detected dashboard"
                className="w-full object-contain"
              />
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Feedback categories
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {analysis.feedback_json?.map((item) => {
              const statusStyles =
                item.status === "pass"
                  ? "bg-lime-100 text-lime-800"
                  : item.status === "warning"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800";

              return (
                <div
                  key={`${analysis.id}-${item.category}`}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">{item.category}</p>
                      <h4 className="mt-1 text-lg font-semibold text-slate-900">
                        Output
                      </h4>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {item.message}
                  </p>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Score</span>
                      <span>{item.score}/100</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === "pass"
                            ? "bg-lime-500"
                            : item.status === "warning"
                              ? "bg-amber-400"
                              : "bg-red-500"
                        }`}
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