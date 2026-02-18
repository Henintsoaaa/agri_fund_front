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
import { Mail } from "lucide-react";
import { useState } from "react";
import { requestPasswordResetApi } from "@/features/auth/api/auth.api";
import { useNavigate } from "react-router-dom";

export default function RequestResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // URL de redirection après reset (frontend)
      const redirectTo = `${window.location.origin}/reset-password`;
      await requestPasswordResetApi(email, redirectTo);
      setSuccess(true);
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(
        err?.response?.data?.message ||
          "Erreur lors de l'envoi de l'email de réinitialisation",
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
            <Mail className="h-8 w-8 text-olive" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-forest">
            Email envoyé !
          </CardTitle>
          <CardDescription className="text-sage text-center">
            Un email avec un lien de réinitialisation a été envoyé à {email}.
            Vérifiez votre boîte mail (et les spams).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-forest text-cream hover:bg-forest/90"
          >
            Retour à la connexion
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-cream/50 border-sage/30 shadow-lg">
      <CardHeader>
        <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-forest" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-forest">
          Mot de passe oublié ?
        </CardTitle>
        <CardDescription className="text-sage text-center">
          Entrez votre email pour recevoir un lien de réinitialisation
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-forest font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-sage/30 focus:border-forest"
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-forest text-cream hover:bg-forest/90"
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
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
