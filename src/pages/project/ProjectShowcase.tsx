import React, { useState } from "react";
import { MapPin, Clock, Users, Plus, Filter } from "lucide-react";
import { useProject } from "@/features/project/hooks/useProject";

const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { allProjects, isLoadingAllProjects, allProjectsError } = useProject();

  const categories = [
    { id: "all", label: "Tous les projets" },
    { id: "rice", label: "Riziculture" },
    { id: "livestock", label: "Élevage" },
    { id: "vegetables", label: "Maraîchage" },
    { id: "fruits", label: "Arboriculture" },
  ];

  // Transform API data to match component structure
  const projects =
    allProjects?.map((project) => ({
      id: project.id,
      title: project.title,
      farmer: "Project Owner", // You might want to add owner info to the API
      location: "Location TBD", // You might want to add location to the API
      category: project.category || "other",
      description: project.description,
      fundingGoal:
        project.stages?.reduce(
          (total, stage) => total + stage.targetAmount,
          0,
        ) || 0,
      currentFunding:
        project.stages?.reduce(
          (total, stage) => total + stage.collectedAmount,
          0,
        ) || 0,
      investors: 0, // You might want to add investor count to the API
      timeLeft: "TBD", // You might want to add deadline to the API
      image:
        project.image ||
        "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400",
      roi: "TBD", // You might want to add ROI to the API
      tags: ["En cours"], // You might want to add tags to the API
      stages: project.stages || [],
    })) || [];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  if (isLoadingAllProjects) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-sage">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  if (allProjectsError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">Erreur lors du chargement des projets</p>
          <p className="text-sage mt-2">{allProjectsError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-8 px-48 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-forest mb-2">
              Projets agricoles
            </h2>
            <p className="text-sage">
              Découvrez et financez les initiatives de nos agriculteurs formés
              par le GAE
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-forest text-cream px-4 py-2 rounded-lg hover:bg-olive transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span>Présenter mon projet</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="h-5 w-5 text-sage" />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? "bg-forest text-cream"
                  : "bg-white text-sage border border-sage/20 hover:border-olive hover:text-olive"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const progressPercentage =
              (project.currentFunding / project.fundingGoal) * 100;

            return (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg border border-sage/10 overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-forest text-cream px-3 py-1 rounded-full text-sm font-medium">
                    ROI: {project.roi}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-sage/20 text-olive px-2 py-1 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-bold text-forest text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sage text-sm mb-1">Par {project.farmer}</p>

                  <div className="flex items-center text-sage/80 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>

                  <p className="text-sage text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Funding Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-forest">
                        €{project.currentFunding.toLocaleString()} / €
                        {project.fundingGoal.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium text-olive">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-sage/20 rounded-full h-3">
                      <div
                        className="bg-olive h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sage">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        {project.investors} investisseurs
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sage">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {project.timeLeft} restants
                      </span>
                    </div>
                  </div>

                  {/* Project Stages */}
                  {project.stages && project.stages.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-forest mb-3">
                        Étapes du projet
                      </h4>
                      <div className="space-y-2">
                        {project.stages.map((stage, index) => (
                          <div
                            key={stage.id}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-sage">
                              Étape {index + 1}: {stage.title}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                stage.statut === "FUNDED"
                                  ? "bg-green-100 text-green-800"
                                  : stage.statut === "OPEN"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {stage.statut === "FUNDED"
                                ? "Financé"
                                : stage.statut === "OPEN"
                                  ? "Ouvert"
                                  : "Fermé"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-forest text-cream py-3 px-4 rounded-lg hover:bg-olive transition-colors duration-200 font-medium">
                      Investir maintenant
                    </button>
                    <button className="border border-sage text-sage py-3 px-4 rounded-lg hover:border-olive hover:text-olive transition-colors duration-200 font-medium">
                      En savoir plus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-sage/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Filter className="h-12 w-12 text-sage" />
            </div>
            <h3 className="text-lg font-medium text-forest mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-sage">
              Essayez de changer les filtres ou revenez plus tard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectShowcase;
