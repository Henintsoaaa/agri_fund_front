import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectOwnerLayout from "@/components/layout/ProjectOwnerLayout";
import { useProject } from "@/features/project/hooks/useProject";
import { ArrowLeftIcon, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateProjectStagePayload } from "@/features/project/types/project.types";

export default function CreateProject() {
  const navigate = useNavigate();
  const { createProject, isCreatingProject } = useProject();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    statut: "DRAFT" as "DRAFT" | "ACTIVE" | "COMPLETED" | "SUSPENDED",
  });

  const [stages, setStages] = useState<CreateProjectStagePayload[]>([
    {
      title: "",
      description: "",
      targetAmount: 0,
      stageOrder: 1,
    },
  ]);

  const handleAddStage = () => {
    setStages([
      ...stages,
      {
        title: "",
        description: "",
        targetAmount: 0,
        stageOrder: stages.length + 1,
      },
    ]);
  };

  const handleRemoveStage = (index: number) => {
    const newStages = stages.filter((_, i) => i !== index);
    // Reorder stages
    const reorderedStages = newStages.map((stage, i) => ({
      ...stage,
      stageOrder: i + 1,
    }));
    setStages(reorderedStages);
  };

  const handleStageChange = (
    index: number,
    field: keyof CreateProjectStagePayload,
    value: string | number,
  ) => {
    const newStages = [...stages];
    newStages[index] = {
      ...newStages[index],
      [field]: value,
    };
    setStages(newStages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      stages,
    };

    createProject(projectData, {
      onSuccess: () => {
        navigate("/project-owner-dashboard");
      },
    });
  };

  return (
    <div>
      <ProjectOwnerLayout />
      <div className="p-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <button
            className="p-2 text-sage hover:text-cream hover:bg-olive rounded-full transition-colors duration-200"
            onClick={() => navigate("/project-owner-dashboard")}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-forest">
              Créer un nouveau projet
            </h2>
            <p className="text-sage">
              Définissez votre projet et ses étapes de financement
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-forest">
                Informations du projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Titre du projet *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Ex: Riziculture Bio Antsirabe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Décrivez votre projet agricole..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Ex: Riziculture, Maraîchage..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="statut">Statut initial</Label>
                <Select
                  value={formData.statut}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, statut: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Brouillon</SelectItem>
                    <SelectItem value="ACTIVE">Actif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Project Stages */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-forest">Étapes du projet</CardTitle>
                <Button
                  type="button"
                  onClick={handleAddStage}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une étape
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {stages.map((stage, index) => (
                <Card key={index} className="border-2 border-sage/20">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-forest">
                        Étape {stage.stageOrder}
                      </h4>
                      {stages.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => handleRemoveStage(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`stage-title-${index}`}>
                        Titre de l'étape *
                      </Label>
                      <Input
                        id={`stage-title-${index}`}
                        value={stage.title}
                        onChange={(e) =>
                          handleStageChange(index, "title", e.target.value)
                        }
                        placeholder="Ex: Phase de préparation"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor={`stage-description-${index}`}>
                        Description *
                      </Label>
                      <Textarea
                        id={`stage-description-${index}`}
                        value={stage.description}
                        onChange={(e) =>
                          handleStageChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Décrivez cette étape..."
                        rows={2}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor={`stage-amount-${index}`}>
                        Montant cible (€) *
                      </Label>
                      <Input
                        id={`stage-amount-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={stage.targetAmount}
                        onChange={(e) =>
                          handleStageChange(
                            index,
                            "targetAmount",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        placeholder="5000"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/project-owner-dashboard")}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-forest text-cream hover:bg-olive"
              disabled={isCreatingProject}
            >
              {isCreatingProject ? "Création..." : "Créer le projet"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
