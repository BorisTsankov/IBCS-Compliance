import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/context/UserContext";
import { apiRequest, type DashboardAnalysis } from "@/lib/api";

const History = () => {
  const { pending, authenticated } = useUser();
  const navigate = useNavigate();

  const [history, setHistory] = useState<DashboardAnalysis[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const loadHistory = async () => {
    try {
      setIsLoadingHistory(true);

      const data = await apiRequest<DashboardAnalysis[]>("/api/dashboard/history", {
        method: "GET",
      });

      setHistory(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load dashboard history.";
      toast.error(message);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (!pending && authenticated) {
      void loadHistory();
    }
  }, [pending, authenticated]);

  if (pending || isLoadingHistory) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading history...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-400">App / History</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Analysis History
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Browse previously uploaded dashboards and open any analysis in detail.
          </p>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          {history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              No previous analyses yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/dashboard/${item.id}`)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-violet-400 hover:bg-violet-50"
                >
                  <p className="truncate text-base font-semibold text-slate-900">
                    {item.original_filename}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="text-slate-400">Score:</span>{" "}
                      {item.overall_score ?? "-"} / 100
                    </p>
                    <p className="capitalize">
                      <span className="text-slate-400">Result:</span>{" "}
                      {item.overall_result?.replaceAll("_", " ") ?? "unknown"}
                    </p>
                    <p>
                      <span className="text-slate-400">Status:</span>{" "}
                      <span className="capitalize">{item.status}</span>
                    </p>
                    <p>
                      <span className="text-slate-400">Uploaded:</span>{" "}
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default History;