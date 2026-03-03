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
    <div className="h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/project-owner")}
            className="w-fit text-sage hover:text-forest hover:bg-sage/10 gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Retour
          </Button>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-forest">
              Créer un nouveau projet
            </h1>
            <p className="text-sage text-lg">
              Définissez votre projet et ses étapes de financement
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Details */}
          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <CardTitle className="text-forest">
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
                  className="border-sage/30 focus:border-forest"
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
                  className="border-sage/30 focus:border-forest"
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
                  className="border-sage/30 focus:border-forest"
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
                  <SelectTrigger className="border-sage/30 focus:border-forest">
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
          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-forest">Étapes du projet</CardTitle>
                <Button
                  type="button"
                  onClick={handleAddStage}
                  variant="outline"
                  className="border-forest text-forest hover:bg-forest hover:text-cream"
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
                  className="border-olive/30 bg-cream hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-sage/20">
                      <div className="flex items-center gap-3">
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
                          className="text-destructive hover:bg-destructive/10"
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
                        className="border-sage/30 focus:border-forest"
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
                        className="border-sage/30 focus:border-forest"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`stage-amount-${index}`}
                        className="text-forest font-semibold"
                      >
                        Montant cible (MGA) *
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
                        className="border-sage/30 focus:border-forest"
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
                        className="border-sage/30 focus:border-forest"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/project-owner")}
              className="border-sage/50 text-sage hover:bg-sage/10"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-forest text-cream hover:bg-forest/90"
              disabled={isCreatingProject}
            >
              {isCreatingProject ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-cream/20 border-t-cream"></div>
                  Création en cours...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
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
