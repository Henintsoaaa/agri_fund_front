import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordApi } from "@/features/auth/api/auth.api";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Le token vient de l'URL: /reset-password?token=xxx
  const token = searchParams.get("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (!token) {
      setError("Token de réinitialisation manquant");
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordApi(token, newPassword);
      setSuccess(true);
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(
        err?.response?.data?.message ||
          "Erreur lors de la réinitialisation. Le lien a peut-être expiré.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md bg-cream/50 border-sage/30 shadow-lg">
        <CardHeader>
          <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-olive" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-forest">
            Mot de passe modifié !
          </CardTitle>
          <CardDescription className="text-sage text-center">
            Votre mot de passe a été réinitialisé avec succès. Vous pouvez
            maintenant vous connecter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-forest text-cream hover:bg-forest/90"
          >
            Se connecter
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-cream/50 border-sage/30 shadow-lg">
      <CardHeader>
        <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-forest" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-forest">
          Nouveau mot de passe
        </CardTitle>
        <CardDescription className="text-sage text-center">
          Entrez votre nouveau mot de passe
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-forest font-semibold">
              Nouveau mot de passe
            </Label>
            <Input
              id="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-sage/30 focus:border-forest"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-forest font-semibold"
            >
              Confirmer le mot de passe
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-sage/30 focus:border-forest"
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-forest text-cream hover:bg-forest/90"
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser"}
          </Button>

          <Button
            type="button"
            variant="link"
            onClick={() => navigate("/login")}
            className="w-full text-sage hover:text-forest"
          >
            Retour à la connexion
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
