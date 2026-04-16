import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, Plus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { apiRequest } from "@/lib/api";

type FeedbackItem = {
  category: string;
  score: number;
  status: "pass" | "warning" | "fail";
  message: string;
};

type DashboardAnalysis = {
  id: number;
  user_id: string | null;
  original_filename: string;
  stored_filename: string;
  file_path: string;
  file_type: string;
  file_size: number;
  status: string;
  overall_result: string | null;
  overall_score: number | null;
  confidence: string | null;
  summary: string | null;
  error_message: string | null;
  feedback_json: FeedbackItem[];
  created_at: string;
  updated_at: string;
};

const Dashboard = () => {
  const { user, pending, authenticated } = useUser();

  const [history, setHistory] = useState<DashboardAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<DashboardAnalysis | null>(null);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const loadHistory = async () => {
    try {
      setIsLoadingHistory(true);

      const data = await apiRequest<DashboardAnalysis[]>("/api/dashboard/history", {
        method: "GET",
      });

      setHistory(data);

      if (data.length > 0 && !selectedAnalysis) {
        setSelectedAnalysis(data[0]);
      }
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

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await apiRequest<DashboardAnalysis>("/api/dashboard/analyze", {
        method: "POST",
        body: formData,
      });

      setSelectedAnalysis(result);
      setSelectedFile(null);
      setIsUploadOpen(false);
      toast.success("Dashboard uploaded successfully.");

      await loadHistory();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload dashboard.";
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const resultLabel = useMemo(() => {
    if (!selectedAnalysis?.overall_result) return "Unknown";
    return selectedAnalysis.overall_result.replaceAll("_", " ");
  }, [selectedAnalysis]);

  if (pending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-400">App / Dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              Your Drafts
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Welcome{user ? `, ${user.username}` : ""}. Upload a dashboard and review its mock IBCS analysis.
            </p>
          </div>

          <Button
            onClick={() => setIsUploadOpen(true)}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Dashboard
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">History</h2>
              {isLoadingHistory && (
                <LoaderCircle className="h-4 w-4 animate-spin text-slate-400" />
              )}
            </div>

            {history.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
                No previous analyses yet.
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => {
                  const isActive = selectedAnalysis?.id === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedAnalysis(item)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        isActive
                          ? "border-violet-500 bg-violet-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <p className="truncate text-sm font-medium text-slate-900">
                        {item.original_filename}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Score: {item.overall_score ?? "-"} / 100
                      </p>
                      <p className="mt-1 text-xs capitalize text-slate-500">
                        Result: {item.overall_result?.replaceAll("_", " ") ?? "unknown"}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            {!selectedAnalysis ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
                Upload a dashboard or select one from your history.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-400">Selected dashboard</p>
                    <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                      {selectedAnalysis.original_filename}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {selectedAnalysis.summary ?? "No summary available."}
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
                          {selectedAnalysis.overall_score ?? "-"} / 100
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Confidence
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {selectedAnalysis.confidence ?? "-"}
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
                        <p className="mt-1">{selectedAnalysis.file_type}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Size
                        </p>
                        <p className="mt-1">
                          {(selectedAnalysis.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Status
                        </p>
                        <p className="mt-1 capitalize">{selectedAnalysis.status}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-slate-900">
                    Feedback categories
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedAnalysis.feedback_json?.map((item) => {
                      const statusStyles =
                        item.status === "pass"
                          ? "bg-lime-100 text-lime-800"
                          : item.status === "warning"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800";

                      return (
                        <div
                          key={`${selectedAnalysis.id}-${item.category}`}
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
            )}
          </section>
        </div>
      </div>

      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">Upload Files</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Upload files to your dashboard so we can analyse them.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isUploading) {
                    setIsUploadOpen(false);
                    setSelectedFile(null);
                  }
                }}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.ppt,.pptx,.doc,.docx"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="mx-auto block text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-violet-700"
              />

              <p className="mt-4 text-sm text-slate-500">
                Supported files: image, PDF, PPTX, DOCX
              </p>

              {selectedFile && (
                <p className="mt-3 text-sm font-medium text-slate-700">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsUploadOpen(false);
                  setSelectedFile(null);
                }}
                disabled={isUploading}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  "Add New Dashboard"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;