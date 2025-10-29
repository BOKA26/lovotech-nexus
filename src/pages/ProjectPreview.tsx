import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

const ProjectPreview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectUrl = searchParams.get("url");
  const projectTitle = searchParams.get("title");

  if (!projectUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2" size={16} />
            Retour au Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button */}
      <header className="bg-card border-b border-border p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Retour au Portfolio
          </Button>
          {projectTitle && (
            <h1 className="text-lg font-semibold truncate">{decodeURIComponent(projectTitle)}</h1>
          )}
        </div>
        <Button
          onClick={() => window.open(projectUrl, "_blank")}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          Ouvrir dans un nouvel onglet
          <ExternalLink size={16} />
        </Button>
      </header>

      {/* Iframe container */}
      <div className="flex-1 relative">
        <iframe
          src={projectUrl}
          className="w-full h-full absolute inset-0"
          title={projectTitle || "Prévisualisation du projet"}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
};

export default ProjectPreview;
