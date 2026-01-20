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
      <Card className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl border-none">
        <CardHeader>
          <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-green-100">
            <Lock className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-forest">
            Mot de passe modifié !
          </CardTitle>
          <CardDescription className="text-sage mt-2 text-center">
            Votre mot de passe a été réinitialisé avec succès. Vous pouvez
            maintenant vous connecter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-olive text-cream hover:bg-forest"
          >
            Se connecter
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl border-none">
      <CardHeader>
        <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-olive/10">
          <Lock className="h-8 w-8 text-olive" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-forest">
          Nouveau mot de passe
        </CardTitle>
        <CardDescription className="text-sage mt-2 text-center">
          Entrez votre nouveau mot de passe
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label
              htmlFor="newPassword"
              className="block text-sm font-medium text-forest"
            >
              Nouveau mot de passe
            </Label>
            <Input
              id="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-forest"
            >
              Confirmer le mot de passe
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 bg-olive text-cream hover:bg-forest"
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser"}
          </Button>

          <Button
            type="button"
            variant="link"
            onClick={() => navigate("/login")}
            className="w-full text-sage hover:text-olive"
          >
            Retour à la connexion
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
