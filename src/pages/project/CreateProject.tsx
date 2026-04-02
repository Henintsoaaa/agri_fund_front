import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "@/features/project/hooks/useProject";
import { uploadProjectImageApi } from "@/features/project/api/project.api";
import {
  ArrowLeftIcon,
  Plus,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";
import type { CreateProjectStagePayload } from "@/features/project/types/project.types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StageWithFile extends Omit<CreateProjectStagePayload, "image"> {
  image: string;
  imageFile: File | null;
}

export default function CreateProject() {
  const navigate = useNavigate();
  const { createProject, isCreatingProject } = useProject();
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingProject, setIsDraggingProject] = useState(false);
  const [draggingStageIndex, setDraggingStageIndex] = useState<number | null>(
    null,
  );
  const projectImageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    statut: "DRAFT" as "DRAFT" | "ACTIVE" | "COMPLETED" | "SUSPENDED",
  });

  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);

  const [stages, setStages] = useState<StageWithFile[]>([
    {
      title: "",
      description: "",
      targetAmount: 0,
      stageOrder: 1,
      image: "",
      imageFile: null,
    },
  ]);

  const handleProjectImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetProjectImage(file);
    }
  };

  const validateAndSetProjectImage = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format non supporté. Utilisez JPG, PNG ou WEBP");
      return;
    }
    setProjectImageFile(file);
  };

  const handleProjectDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingProject(true);
  };

  const handleProjectDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingProject(false);
  };

  const handleProjectDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingProject(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetProjectImage(file);
    }
  };

  const handleStageImageChange = (index: number, file: File | null) => {
    if (file) {
      validateAndSetStageImage(index, file);
    } else {
      const newStages = [...stages];
      newStages[index] = {
        ...newStages[index],
        imageFile: null,
      };
      setStages(newStages);
    }
  };

  const validateAndSetStageImage = (index: number, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format non supporté. Utilisez JPG, PNG ou WEBP");
      return;
    }
    const newStages = [...stages];
    newStages[index] = {
      ...newStages[index],
      imageFile: file,
    };
    setStages(newStages);
  };

  const handleStageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingStageIndex(index);
  };

  const handleStageDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingStageIndex(null);
  };

  const handleStageDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingStageIndex(null);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetStageImage(index, file);
    }
  };

  const handleAddStage = () => {
    setStages([
      ...stages,
      {
        title: "",
        description: "",
        targetAmount: 0,
        stageOrder: stages.length + 1,
        image: "",
        imageFile: null,
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
    field: keyof Omit<StageWithFile, "imageFile">,
    value: string | number,
  ) => {
    const newStages = [...stages];
    newStages[index] = {
      ...newStages[index],
      [field]: value,
    };
    setStages(newStages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!projectImageFile) {
      toast.error("Veuillez sélectionner une image pour le projet");
      return;
    }

    for (let i = 0; i < stages.length; i++) {
      if (!stages[i].imageFile) {
        toast.error(`Veuillez sélectionner une image pour l'étape ${i + 1}`);
        return;
      }
    }

    setIsUploading(true);

    try {
      // Step 1: Upload project image
      const projectImageResponse =
        await uploadProjectImageApi(projectImageFile);
      const projectImagePath = projectImageResponse.data.path;

      // Step 2: Upload all stage images
      const stageImagesPromises = stages.map((stage) =>
        stage.imageFile
          ? uploadProjectImageApi(stage.imageFile)
          : Promise.resolve(null),
      );
      const stageImagesResponses = await Promise.all(stageImagesPromises);

      // Step 3: Prepare project data with uploaded image paths
      const stagesData: CreateProjectStagePayload[] = stages.map(
        (stage, index) => ({
          title: stage.title,
          description: stage.description,
          targetAmount: stage.targetAmount,
          stageOrder: stage.stageOrder,
          image: stageImagesResponses[index]?.data.path || "",
        }),
      );

      const projectData = {
        title: formData.title,
        description: formData.description,
        image: projectImagePath,
        statut: formData.statut,
        stages: stagesData,
      };

      // Step 4: Create project
      createProject(projectData, {
        onSuccess: () => {
          setIsUploading(false);
          navigate("/project-owner");
        },
        onError: () => {
          setIsUploading(false);
        },
      });
    } catch (error: any) {
      setIsUploading(false);
      toast.error(
        error.response?.data?.message || "Erreur lors de l'upload des images",
      );
    }
  };

  return (
    <div className=" bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <ScrollArea className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
                  className="border-sage/30 text-forest placeholder:text-sage focus:border-olive focus:ring-olive"
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
                  className="border-sage/30 text-forest placeholder:text-sage focus:border-olive focus:ring-olive"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-forest font-semibold">
                  Image du projet *
                </Label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                    isDraggingProject
                      ? "border-forest bg-olive/10"
                      : "border-sage/30 hover:border-sage/50"
                  }`}
                  onDragOver={handleProjectDragOver}
                  onDragLeave={handleProjectDragLeave}
                  onDrop={handleProjectDrop}
                >
                  <input
                    ref={projectImageInputRef}
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleProjectImageChange}
                    className="hidden"
                  />

                  {projectImageFile ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-sage/10 rounded-md">
                        <ImageIcon className="h-8 w-8 text-olive shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-forest truncate">
                            {projectImageFile.name}
                          </p>
                          <p className="text-xs text-sage">
                            {(projectImageFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setProjectImageFile(null);
                            if (projectImageInputRef.current) {
                              projectImageInputRef.current.value = "";
                            }
                          }}
                          className="h-8 w-8 p-0 shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => projectImageInputRef.current?.click()}
                        className="w-full border-sage/30 hover:bg-olive/10"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Changer l'image
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        <div className="p-4 bg-sage/10 rounded-full">
                          <Upload className="h-8 w-8 text-olive" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-forest">
                          Glissez-déposez une image ici
                        </p>
                        <p className="text-xs text-sage mt-1">
                          ou cliquez pour parcourir
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => projectImageInputRef.current?.click()}
                        className="border-sage/30 hover:bg-olive/10"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Sélectionner une image
                      </Button>
                    </div>
                  )}

                  <p className="text-xs text-sage text-center mt-3">
                    Formats acceptés: JPG, PNG, WEBP (max 5MB)
                  </p>
                </div>
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
                  <SelectTrigger className="border-sage/30 text-forest focus:border-olive focus:ring-olive">
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
                {/* <Button
                  type="button"
                  onClick={handleAddStage}
                  variant="outline"
                  className="border-forest text-forest hover:bg-forest hover:text-cream"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une étape
                </Button> */}
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
                        className="border-sage/30 text-forest placeholder:text-sage focus:border-olive focus:ring-olive"
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
                        className="border-sage/30 text-forest placeholder:text-sage focus:border-olive focus:ring-olive"
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
                        step="1"
                        value={stage.targetAmount}
                        onChange={(e) =>
                          handleStageChange(
                            index,
                            "targetAmount",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        placeholder="5000"
                        className="border-sage/30 text-forest placeholder:text-sage focus:border-olive focus:ring-olive"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`stage-image-${index}`}
                        className="text-forest font-semibold"
                      >
                        Image de l'étape *
                      </Label>
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
                          draggingStageIndex === index
                            ? "border-forest bg-olive/10"
                            : "border-sage/30 hover:border-sage/50"
                        }`}
                        onDragOver={(e) => handleStageDragOver(e, index)}
                        onDragLeave={handleStageDragLeave}
                        onDrop={(e) => handleStageDrop(e, index)}
                      >
                        <input
                          id={`stage-image-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleStageImageChange(index, file);
                            }
                          }}
                          className="hidden"
                        />

                        {stage.imageFile ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-sage/10 rounded-md">
                              <ImageIcon className="h-6 w-6 text-olive shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-forest truncate">
                                  {stage.imageFile.name}
                                </p>
                                <p className="text-xs text-sage">
                                  {(stage.imageFile.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleStageImageChange(index, null)
                                }
                                className="h-6 w-6 p-0 shrink-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document
                                  .getElementById(`stage-image-${index}`)
                                  ?.click()
                              }
                              className="w-full border-sage/30 hover:bg-olive/10"
                              size="sm"
                            >
                              <Upload className="h-3 w-3 mr-2" />
                              Changer
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center space-y-2">
                            <div className="flex justify-center">
                              <Upload className="h-6 w-6 text-olive" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-forest">
                                Glissez-déposez ici
                              </p>
                              <p className="text-xs text-sage">
                                ou cliquez pour parcourir
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document
                                  .getElementById(`stage-image-${index}`)
                                  ?.click()
                              }
                              className="w-full border-sage/30 hover:bg-olive/10"
                              size="sm"
                            >
                              <Upload className="h-3 w-3 mr-2" />
                              Sélectionner
                            </Button>
                          </div>
                        )}

                        <p className="text-xs text-sage text-center mt-2">
                          JPG, PNG, WEBP (max 5MB)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
            <CardFooter>
              <div className="flex justify-end w-full">
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
            </CardFooter>
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
              disabled={isCreatingProject || isUploading}
            >
              {isCreatingProject || isUploading ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-cream/20 border-t-cream"></div>
                  {isUploading ? "Upload en cours..." : "Création en cours..."}
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
      </ScrollArea>
    </div>
  );
}
