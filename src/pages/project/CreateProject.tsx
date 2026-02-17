import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      image: "",
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
        image: "",
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
        navigate("/project-owner");
      },
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/5 to-olive/10 w-full flex justify-center">
      <div className="p-6 sm:p-8 lg:px-96 w-full">
        {/* Header */}
        <div className="mb-8">
          <button
            className="flex items-center space-x-2 text-sage hover:text-forest mb-4 group transition-colors duration-200"
            onClick={() => navigate("/project-owner")}
          >
            <div className="p-2 rounded-full group-hover:bg-sage/10 transition-colors duration-200">
              <ArrowLeftIcon className="h-5 w-5" />
            </div>
            <span className="font-medium">Retour</span>
          </button>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-sage/10">
            <h1 className="text-3xl lg:text-4xl font-bold text-forest mb-3">
              Créer un nouveau projet
            </h1>
            <p className="text-sage text-lg">
              Définissez votre projet et ses étapes de financement
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Details */}
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-forest flex items-center">
                <div className="w-2 h-8 bg-forest rounded-full mr-3"></div>
                Informations du projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-forest font-semibold">
                  Titre du projet *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Ex: Riziculture Bio Antsirabe"
                  className="border-sage/30 focus:border-forest transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-forest font-semibold"
                >
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Décrivez votre projet agricole..."
                  className="border-sage/30 focus:border-forest transition-colors"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-forest font-semibold">
                  URL de l'image *
                </Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="border-sage/30 focus:border-forest transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statut" className="text-forest font-semibold">
                  Statut initial
                </Label>
                <Select
                  value={formData.statut}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, statut: value })
                  }
                >
                  <SelectTrigger className="border-sage/30 focus:border-forest transition-colors">
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
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-2xl text-forest flex items-center">
                  <div className="w-2 h-8 bg-forest rounded-full mr-3"></div>
                  Étapes du projet
                </CardTitle>
                <Button
                  type="button"
                  onClick={handleAddStage}
                  variant="outline"
                  className="border-2 border-forest text-forest hover:bg-forest hover:text-cream transition-all duration-200"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une étape
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {stages.map((stage, index) => (
                <Card
                  key={index}
                  className="border-2 border-olive/20 bg-linear-to-br from-white to-sage/5 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <CardContent className="p-5 lg:p-6 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-sage/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-olive text-cream flex items-center justify-center font-bold">
                          {stage.stageOrder}
                        </div>
                        <h4 className="font-bold text-lg text-forest">
                          Étape {stage.stageOrder}
                        </h4>
                      </div>
                      {stages.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => handleRemoveStage(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`stage-title-${index}`}
                        className="text-forest font-semibold"
                      >
                        Titre de l'étape *
                      </Label>
                      <Input
                        id={`stage-title-${index}`}
                        value={stage.title}
                        onChange={(e) =>
                          handleStageChange(index, "title", e.target.value)
                        }
                        placeholder="Ex: Phase de préparation"
                        className="border-sage/30 focus:border-forest transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`stage-description-${index}`}
                        className="text-forest font-semibold"
                      >
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
                        className="border-sage/30 focus:border-forest transition-colors"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`stage-amount-${index}`}
                        className="text-forest font-semibold"
                      >
                        Montant cible (Ar) *
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
                        className="border-sage/30 focus:border-forest transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`stage-image-${index}`}
                        className="text-forest font-semibold"
                      >
                        URL de l'image *
                      </Label>
                      <Input
                        id={`stage-image-${index}`}
                        value={stage.image}
                        onChange={(e) =>
                          handleStageChange(index, "image", e.target.value)
                        }
                        placeholder="https://example.com/stage-image.jpg"
                        className="border-sage/30 focus:border-forest transition-colors"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/project-owner")}
              className="border-2 border-sage text-sage hover:bg-sage hover:text-cream transition-all duration-200"
              size="lg"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-forest text-cream hover:bg-olive hover:scale-105 transition-all duration-200 shadow-lg font-semibold"
              disabled={isCreatingProject}
              size="lg"
            >
              {isCreatingProject ? (
                <>
                  <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-cream/20 border-t-cream"></div>
                  Création en cours...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Créer le projet
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
