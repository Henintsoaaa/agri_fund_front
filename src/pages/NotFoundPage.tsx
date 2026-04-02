import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl border-sage/30 bg-cream/80 shadow-xl backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <p className="text-6xl font-black tracking-tight text-olive">404</p>
          <CardTitle className="text-3xl text-forest">
            Page introuvable
          </CardTitle>
          <p className="text-sage">
            Cette page n&apos;existe pas ou a ete deplacee.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-sage/30 text-forest hover:bg-olive/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-forest text-cream hover:bg-forest/90"
          >
            <Home className="mr-2 h-4 w-4" />
            Aller a l&apos;accueil
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
