import { useEffect, useState } from "react";
import { LoaderCircle, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { apiRequest, type DashboardAnalysis } from "@/lib/api";
import AnalysisDetails from "@/components/dashboard/AnalysisDetails";

const Dashboard = () => {
  const { user, pending, authenticated } = useUser();
  const { id } = useParams();

  const [selectedAnalysis, setSelectedAnalysis] = useState<DashboardAnalysis | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const loadLatestAnalysis = async () => {
    try {
      setIsLoadingAnalysis(true);

      const data = await apiRequest<DashboardAnalysis[]>("/api/dashboard/history", {
        method: "GET",
      });

      setSelectedAnalysis(data.length > 0 ? data[0] : null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load dashboard history.";
      toast.error(message);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const loadAnalysisById = async (analysisId: string) => {
    try {
      setIsLoadingAnalysis(true);

      const data = await apiRequest<DashboardAnalysis>(`/api/dashboard/${analysisId}`, {
        method: "GET",
      });

      setSelectedAnalysis(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load dashboard analysis.";
      toast.error(message);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    if (!pending && authenticated) {
      if (id) {
        void loadAnalysisById(id);
      } else {
        void loadLatestAnalysis();
      }
    }
  }, [pending, authenticated, id]);

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
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload dashboard.";
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  if (pending || isLoadingAnalysis) {
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

        <AnalysisDetails analysis={selectedAnalysis} />
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