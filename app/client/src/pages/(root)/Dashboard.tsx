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

  const [selectedAnalysis, setSelectedAnalysis] =
    useState<DashboardAnalysis | null>(null);
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
      toast.error(
        error instanceof Error ? error.message : "Failed to load dashboard history.",
      );
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const loadAnalysisById = async (analysisId: string) => {
    try {
      setIsLoadingAnalysis(true);

      const data = await apiRequest<DashboardAnalysis>(
        `/api/dashboard/${analysisId}`,
        {
          method: "GET",
        },
      );

      setSelectedAnalysis(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load dashboard analysis.",
      );
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
      toast.error(
        error instanceof Error ? error.message : "Failed to upload dashboard.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (pending || isLoadingAnalysis) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  const handlePasteFile = (event: React.ClipboardEvent<HTMLDivElement>) => {
  const items = event.clipboardData.items;

  for (const item of items) {
    if (item.kind === "file") {
      const file = item.getAsFile();

      if (file) {
        setSelectedFile(file);
        toast.success("Pasted image selected.");
        return;
      }
    }
  }

  toast.error("No image or file found in clipboard.");
};

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">App / Dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Your Drafts
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome{user ? `, ${user.username}` : ""}. Upload a dashboard and
              review its IBCS analysis.
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
          <div className="w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-foreground">
                  Upload Files
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload a dashboard so we can analyse it.
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
                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
  onPaste={handlePasteFile}
  tabIndex={0}
  className="mt-6 rounded-2xl border border-dashed bg-accent p-8 text-center outline-none focus:border-violet-500"
>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.ppt,.pptx,.doc,.docx"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="mx-auto block text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-violet-700"
              />

              <p className="mt-4 text-sm text-muted-foreground">
                Supported files: image, PDF, PPTX, DOCX
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
  You can also click this area and paste a screenshot with Ctrl + V.
</p>

              {selectedFile && (
                <p className="mt-3 text-sm font-medium text-foreground">
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