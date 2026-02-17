import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { ProjectStage } from "@/features/project/types/project.types";

interface EditProjectStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: ProjectStage | null;
  onUpdate: (
    stageId: string,
    data: { title: string; description: string },
  ) => void;
  isUpdating: boolean;
}

export default function EditProjectStageModal({
  isOpen,
  onClose,
  stage,
  onUpdate,
  isUpdating,
}: EditProjectStageModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (stage) {
      setTitle(stage.title);
      setDescription(stage.description);
    }
  }, [stage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stage) {
      onUpdate(stage.id, { title, description });
    }
  };

  const handleClose = () => {
    if (!isUpdating) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier l'étape du projet</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'étape {stage?.stageOrder}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="stage-title">Titre de l'étape *</Label>
              <Input
                id="stage-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Phase de préparation"
                required
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage-description">Description *</Label>
              <Textarea
                id="stage-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez cette étape..."
                rows={4}
                required
                disabled={isUpdating}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isUpdating}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
