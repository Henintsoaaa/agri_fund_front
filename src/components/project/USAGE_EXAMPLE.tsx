// Example: How to use the UpdateProjectStage component in a project detail page

import UpdateProjectStage from "@/components/project/UpdateProjectStage";
import { useProject } from "@/features/project/hooks/useProject";
import { useParams } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { useGetProjectById } = useProject();
  const { data: project, isLoading } = useGetProjectById(id!);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{project.title}</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Étapes du projet</h2>
        {/* Pass the project stages to the UpdateProjectStage component */}
        <UpdateProjectStage stages={project.stages || []} />
      </div>
    </div>
  );
}
