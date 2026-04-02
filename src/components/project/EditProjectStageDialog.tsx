import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import type { ProjectStage } from "@/features/project/types/project.types";
import { uploadProjectImageApi } from "@/features/project/api/project.api";
import { getImageUrl } from "@/lib/utils/image";

interface EditProjectStageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage: ProjectStage;
  mode: "create" | "update";
  onSave: (data: {
    title: string;
    description: string;
    targetAmount: number;
    image?: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function EditProjectStageDialog({
  open,
  onOpenChange,
  stage,
  mode,
  onSave,
  isLoading = false,
}: EditProjectStageDialogProps) {
  const [title, setTitle] = useState(stage.title);
  const [description, setDescription] = useState(stage.description);
  const [targetAmount, setTargetAmount] = useState(
    stage.targetAmount.toString(),
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    stage.image ? getImageUrl(stage.image) : null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(stage.title);
      setDescription(stage.description);
      setTargetAmount(stage.targetAmount.toString());
      setImageFile(null);
      setImagePreview(stage.image ? getImageUrl(stage.image) : null);
    }
  }, [open, stage]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    try {
      const updateData: {
        title: string;
        description: string;
        targetAmount: number;
        image?: string;
      } = {
        title,
        description,
        targetAmount: parseFloat(targetAmount) || stage.targetAmount,
      };

      if (imageFile) {
        setUploadingImage(true);
        const uploadResponse = await uploadProjectImageApi(imageFile);
        updateData.image = uploadResponse.data.path;
        setUploadingImage(false);
      } else if (imagePreview !== null && stage.image) {
        // Keep existing image (no change)
        updateData.image = stage.image;
      }
      // If imagePreview is null and stage had an image, image is intentionally removed

      await onSave(updateData);
    } catch (error) {
      setUploadingImage(false);
      console.error("Error uploading image:", error);
    }
  };

  const isBusy = isLoading || uploadingImage;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 bg-cream border-sage/20">
        <DialogHeader>
          <DialogTitle className="text-forest">
            {mode === "create" ? "Créer une étape" : "Modifier l'étape"}
          </DialogTitle>
          <DialogDescription className="text-sage">
            {mode === "create"
              ? "Créez une nouvelle étape pour votre projet."
              : "Modifiez le titre, la description, le montant cible et l'image de cette étape."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="stage-title" className="text-forest">
              Titre
            </Label>
            <Input
              id="stage-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'étape"
              className="border-sage/30 focus:border-olive focus:ring-olive"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="stage-description" className="text-forest">
              Description
            </Label>
            <Textarea
              id="stage-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de l'étape"
              rows={4}
              className="border-sage/30 focus:border-olive focus:ring-olive"
            />
          </div>

          {/* Target Amount */}
          <div className="space-y-2">
            <Label htmlFor="stage-target" className="text-forest">
              Montant cible (Ar)
            </Label>
            <Input
              id="stage-target"
              type="number"
              min={0}
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Montant cible"
              className="border-sage/30 focus:border-olive focus:ring-olive"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-forest">Image de l'étape</Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
                isDragging
                  ? "border-olive bg-olive/10"
                  : "border-sage/30 hover:border-olive/50"
              }`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Upload className="h-12 w-12 text-sage mb-4" />
                  <p className="text-sm text-sage mb-2">
                    Glissez-déposez une image ou
                  </p>
                  <label htmlFor="stage-image-input">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-sage/30 text-forest hover:bg-olive/10"
                    >
                      <span>Sélectionner un fichier</span>
                    </Button>
                  </label>
                  <input
                    id="stage-image-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isBusy}
            className="border-sage/30 text-sage hover:bg-sage/10"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isBusy}
            className="bg-forest hover:bg-forest/90 text-cream"
          >
            {isBusy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploadingImage
                  ? "Upload en cours..."
                  : mode === "create"
                    ? "Création..."
                    : "Enregistrement..."}
              </>
            ) : mode === "create" ? (
              "Créer"
            ) : (
              "Enregistrer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
