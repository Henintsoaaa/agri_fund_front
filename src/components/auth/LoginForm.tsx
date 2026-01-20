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
import { useLogin } from "@/features/auth/hooks/useLogin";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();
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
    <Card className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl border-none">
      <CardHeader>
        <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-olive/10">
          <User className="h-8 w-8 text-olive" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-forest">
          Se connecter avec votre compte
        </CardTitle>
        <CardDescription className="text-sage mt-2 text-center">
          Entrez vos informations ci-dessous pour accéder au plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 ">
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
                className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-forest"
                >
                  Mot de passe
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                href="#"
                onClick={handleForgotPassword}
                className="ml-auto text-olive inline-block text-sm underline-offset-4 hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <CardFooter className="flex-col justify-center items-center w-full px-0 mt-6">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 bg-olive text-cream hover:bg-forest/70"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="relative flex justify-center text-sm pt-5">
              <span className="px-2 bg-white text-sage">ou</span>
            </div>

            <CardAction className="text-center">
              <Button
                onClick={handleRegisterRedirect}
                type="button"
                variant="link"
                className=" text-sage hover:text-olive transition-colors duration-200 text-sm"
              >
                Creer un compte Investisseur
              </Button>
            </CardAction>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
