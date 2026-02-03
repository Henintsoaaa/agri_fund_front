import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface CreateUserDialogProps {
  onCreate: (name: string, email: string) => Promise<boolean>;
}

export default function CreateUserDialog({ onCreate }: CreateUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await onCreate(name, email);
    setLoading(false);

    if (success) {
      setName("");
      setEmail("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-forest hover:bg-forest/90 text-cream shadow-md">
          <Plus size={16} />
          <span className="hidden sm:inline">Créer un utilisateur</span>
          <span className="sm:hidden">Créer</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-sage/20">
        <DialogHeader>
          <DialogTitle className="text-forest text-xl">
            Créer un nouvel utilisateur
          </DialogTitle>
          <DialogDescription className="text-sage">
            Ajoutez un nouvel utilisateur au système. Un mot de passe par défaut
            sera généré.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-forest">
              Nom complet
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jean Dupont"
              required
              disabled={loading}
              className="border-sage/30 focus:border-olive focus:ring-olive"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-forest">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.dupont@example.com"
              required
              disabled={loading}
              className="border-sage/30 focus:border-olive focus:ring-olive"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="border-sage/30 text-sage hover:bg-sage/10"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-forest hover:bg-forest/90 text-cream"
            >
              {loading ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
