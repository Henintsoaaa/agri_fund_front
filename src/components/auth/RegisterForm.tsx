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
import { useAuth } from "@/features/auth/hooks/useAuth";
import { User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      name,
      email,
      password,
      phoneNumber: phone,
      country,
    });
  };

  return (
    <Card className="w-full max-w-md bg-cream/50 border-sage/30 shadow-lg">
      <CardHeader>
        <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-forest" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-forest">
          Inscription
        </CardTitle>
        <CardDescription className="text-sage text-center">
          Créez votre compte pour accéder à la plateforme
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-forest font-semibold">
                Nom complet
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-sage/30 focus:border-forest"
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-forest font-semibold">
                Numéro de téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+261 xx xx xxx xx"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-sage/30 focus:border-forest"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-forest font-semibold">
                Pays
              </Label>
              <Input
                id="country"
                type="text"
                placeholder="Madagascar"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border-sage/30 focus:border-forest"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-forest font-semibold">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-sage/30 focus:border-forest"
              />
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-forest hover:bg-forest/90 text-cream"
            >
              {isLoading ? "Inscription..." : "S'inscrire"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col justify-center items-center w-full">
          <div className="relative w-full pt-2 ">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-sage/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#fbf8e8] px-2 text-sage">ou</span>
            </div>
          </div>

          <CardAction className="mt-4">
            <Button
              onClick={handleLoginRedirect}
              variant="link"
              className="text-sage hover:text-forest"
            >
              Se connecter si vous avez déjà un compte
            </Button>
          </CardAction>
        </CardFooter>
      </form>
    </Card>
  );
}
