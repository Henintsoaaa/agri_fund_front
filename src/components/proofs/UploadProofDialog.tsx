import { useState } from "react";
import { X, Upload, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadProofDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (data: {
    file: File;
    projectId: string;
    projectStageId?: string;
    title: string;
    description?: string;
  }) => Promise<void>;
  projects: Array<{
    id: string;
    title: string;
    stages?: Array<{
      id: string;
      title: string;
      stageOrder: number;
    }>;
  }>;
  isUploading: boolean;
}

export default function UploadProofDialog({
  open,
  onOpenChange,
  onUpload,
  projects,
  isUploading,
}: UploadProofDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [projectId, setProjectId] = useState("");
  const [projectStageId, setProjectStageId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const selectedProject = projects.find((p) => p.id === projectId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !projectId || !title) {
      return;
    }

    await onUpload({
      file,
      projectId,
      projectStageId: projectStageId || undefined,
      title,
      description: description || undefined,
    });

    // Reset form
    setFile(null);
    setProjectId("");
    setProjectStageId("");
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-forest">Upload une preuve</DialogTitle>
          <DialogDescription className="text-sage">
            Ajoutez des preuves de progression pour vos projets
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">Fichier *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="flex-1 selection:bg-olive selection:text-cream"
                required
              />
              {file && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {file && (
              <div className="flex items-center gap-2 text-sm text-sage">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
                <span className="text-xs">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            )}
            <p className="text-xs text-sage">
              Formats acceptés: Images, PDF, DOC, DOCX (max 10MB)
            </p>
          </div>

          {/* Project Selection */}
          <div className="space-y-2">
            <Label htmlFor="project">Projet *</Label>
            <Select value={projectId} onValueChange={setProjectId} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un projet" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stage Selection (optional) */}
          {selectedProject &&
            selectedProject.stages &&
            selectedProject.stages.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="stage">Étape (optionnel)</Label>
                <Select
                  value={projectStageId}
                  onValueChange={setProjectStageId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Projet entier (pas d'étape spécifique)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Projet entier</SelectItem>
                    {selectedProject.stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        Étape {stage.stageOrder}: {stage.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Construction de la serre - Semaine 1"
              required
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
              placeholder="Détails supplémentaires..."
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isUploading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-forest hover:bg-forest/90"
              disabled={isUploading || !file || !projectId || !title}
            >
              {isUploading ? (
                "Upload en cours..."
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Uploader
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
