import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useProofs } from "@/features/proofs/hooks/useProofs";
import { Upload, FileText } from "lucide-react";
import { toast } from "sonner";

interface CreatProofModalProps {
  projectId: string;
  stageId: string;
}

export default function CreatProofModal({
  projectId,
  stageId,
}: CreatProofModalProps) {
  const [isAddingProof, setIsAddingProof] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadProof, isUploadingProof } = useProofs();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Le fichier ne doit pas dépasser 10MB");
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Format de fichier non supporté. Utilisez JPG, PNG, PDF ou DOC",
        );
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleCreateProof = async () => {
    // Validation
    if (!title.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    if (!selectedFile) {
      toast.error("Veuillez sélectionner un fichier");
      return;
    }

    try {
      await uploadProof({
        file: selectedFile,
        projectId,
        projectStageId: stageId,
        title: title.trim(),
        description: description.trim() || undefined,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setIsAddingProof(false);
    } catch (error) {
      // Error is handled by the hook
      console.error("Upload proof error:", error);
    }
  };

  return (
    <div>
      <Dialog open={isAddingProof} onOpenChange={setIsAddingProof}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-sage/30 text-forest hover:bg-olive/10"
          >
            Ajouter des preuves
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-131.25 bg-cream border-sage/20">
          <DialogHeader>
            <DialogTitle className="text-forest">
              Ajouter une preuve
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-forest">
                Titre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Ex: Réception du matériel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isUploadingProof}
                className="border-sage/30 focus:border-olive focus:ring-olive selection:bg-olive selection:text-cream"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-forest">
                Description (optionnel)
              </Label>
              <Textarea
                id="description"
                placeholder="Décrivez la preuve..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploadingProof}
                className="min-h-25 border-sage/30 focus:border-olive focus:ring-olive selection:bg-olive selection:text-cream"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file" className="text-forest">
                Fichier <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  id="file"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={isUploadingProof}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full border-sage/30 text-forest hover:bg-olive/10"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingProof}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {selectedFile ? "Changer le fichier" : "Importer un fichier"}
                </Button>

                {selectedFile && (
                  <div className="flex items-center gap-2 rounded-md border border-sage/30 bg-olive/5 p-2">
                    <FileText className="h-4 w-4 text-olive" />
                    <span className="text-sm text-forest truncate flex-1">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-sage">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                )}

                <p className="text-xs text-sage">
                  Formats acceptés: JPG, PNG, PDF, DOC (max 10MB)
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingProof(false)}
              disabled={isUploadingProof}
              className="border-sage/30 text-sage hover:bg-sage/10"
            >
              Annuler
            </Button>
            <Button
              onClick={handleCreateProof}
              disabled={isUploadingProof}
              className="bg-forest text-cream hover:bg-forest/90"
            >
              {isUploadingProof ? "Envoi en cours..." : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
