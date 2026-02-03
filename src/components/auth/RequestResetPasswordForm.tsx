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
      <Card className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl border-none">
        <CardHeader>
          <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-green-100">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-forest">
            Email envoyé !
          </CardTitle>
          <CardDescription className="text-sage mt-2 text-center">
            Un email avec un lien de réinitialisation a été envoyé à {email}.
            Vérifiez votre boîte mail (et les spams).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-olive text-cream hover:bg-forest"
          >
            Retour à la connexion
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl border-none">
      <CardHeader>
        <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-olive/10">
          <Mail className="h-8 w-8 text-olive" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-forest">
          Mot de passe oublié ?
        </CardTitle>
        <CardDescription className="text-sage mt-2 text-center">
          Entrez votre email pour recevoir un lien de réinitialisation
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-forest"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 bg-olive text-cream hover:bg-forest"
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
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
