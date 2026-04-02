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
import type { Project } from "@/features/project/types/project.types";
import { uploadProjectImageApi } from "@/features/project/api/project.api";
import { getImageUrl } from "@/lib/utils/image";

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSave: (data: {
    title: string;
    description: string;
    image?: string;
  }) => void;
  isLoading?: boolean;
}

export function EditProjectDialog({
  open,
  onOpenChange,
  project,
  onSave,
  isLoading = false,
}: EditProjectDialogProps) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    project.image ? getImageUrl(project.image) : null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(project.title);
      setDescription(project.description);
      setImageFile(null);
      setImagePreview(project.image ? getImageUrl(project.image) : null);
    }
  }, [open, project]);

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
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setImageFile(null);
    setImagePreview(null); // Clear preview completely
  };

  const handleSubmit = async () => {
    try {
      const updateData: {
        title: string;
        description: string;
        image?: string;
      } = {
        title,
        description,
      };

      // Upload new image if selected
      if (imageFile) {
        setUploadingImage(true);
        const uploadResponse = await uploadProjectImageApi(imageFile);
        updateData.image = uploadResponse.data.path;
        setUploadingImage(false);
      } else if (imagePreview === null && project.image) {
        // Image was removed - keep original (or you could implement deletion)
        // For now, we keep the original image
        updateData.image = project.image;
      }

      onSave(updateData);
    } catch (error) {
      setUploadingImage(false);
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Modifier le projet</DialogTitle>
          <DialogDescription>
            Modifiez le titre, la description et l'image de votre projet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du projet"
              className="selection:bg-olive selection:text-cream"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du projet"
              rows={4}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Image du projet</Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-primary/50"
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
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Glissez-déposez une image ou
                  </p>
                  <label htmlFor="image-input">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>Sélectionner un fichier</span>
                    </Button>
                    <input
                      id="image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden selection:bg-olive selection:text-cream"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading || uploadingImage}
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || uploadingImage || !title || !description}
          >
            {(isLoading || uploadingImage) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
