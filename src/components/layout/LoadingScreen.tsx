import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-cream via-sage/10 to-olive/10">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-forest" />
        <p className="text-lg font-medium text-forest">
          Chargement en cours...
        </p>
      </div>
    </div>
  );
}
