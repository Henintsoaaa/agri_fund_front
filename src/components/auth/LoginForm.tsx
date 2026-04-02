import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Card className="w-full max-w-md bg-cream/50 border-sage/30 shadow-lg">
      <CardHeader>
        <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-forest" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-forest">
          Connexion
        </CardTitle>
        <CardDescription className="text-sage text-center">
          Connectez-vous pour accéder à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-forest font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-sage/30 focus:border-forest selection:bg-olive selection:text-cream"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-forest font-semibold">
                  Mot de passe
                </Label>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-olive text-sm hover:underline"
                >
                  Oublié ?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="border-sage/30 focus:border-forest selection:bg-olive selection:text-cream"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-destructive text-sm mt-2">{error}</p>}

          <CardFooter className="flex-col px-0 mt-6 gap-4">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-forest hover:bg-forest/90 text-cream"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-sage/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-cream/50 px-2 text-sage">ou</span>
              </div>
            </div>

            <CardAction className="text-center">
              <Button
                onClick={handleRegisterRedirect}
                type="button"
                variant="link"
                className="text-sage hover:text-forest"
              >
                Créer un compte Investisseur
              </Button>
            </CardAction>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
