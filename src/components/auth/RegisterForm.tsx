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

export function RegisterForm() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Card className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl border-none">
      <CardHeader>
        <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-olive/10">
          <User className="h-8 w-8 text-olive" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-forest">
          Inscrivez vous
        </CardTitle>
        <CardDescription className="text-sage mt-2 text-center">
          Entrez vos informations ci-dessous pour accéder au plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="">
          <div className="flex flex-col gap-6 ">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-forest"
              >
                Nom
              </Label>
              <Input
                id="name"
                type="name"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="phone"
                className="block text-sm font-medium text-forest"
              >
                Numero Telephone
              </Label>
              <Input
                id="phone"
                type="phone"
                placeholder="+261 xx xx xxx xx"
                required
                className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="country"
                className="block text-sm font-medium text-forest"
              >
                Pays
              </Label>
              <Input
                id="country"
                type="country"
                placeholder="Madagascar"
                required
                className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
              />
            </div>

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
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col  justify-center items-center w-full">
        <Button
          type="submit"
          className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 bg-olive text-cream hover:bg-forest/70"
        >
          S'inscrire
        </Button>

        <div className="relative flex justify-center text-sm pt-5">
          <span className="px-2 bg-white text-sage">ou</span>
        </div>

        <CardAction>
          <Button
            onClick={handleLoginRedirect}
            variant="link"
            className=" text-sage hover:text-olive transition-colors duration-200 text-sm"
          >
            Se connecter si vous avez deja un compte
          </Button>
        </CardAction>

        {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
      </CardFooter>
    </Card>
  );
}
