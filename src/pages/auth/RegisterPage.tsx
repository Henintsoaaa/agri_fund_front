import { RegisterForm } from "@/components/auth/RegisterForm";
import { Sprout } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-screen bg-linear-to-br from-cream via-sage/10 to-olive/10 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sprout className="h-12 w-12 text-forest" />
            <h1 className="text-4xl font-bold text-forest">
              AgriConnect Madagascar
            </h1>
          </div>
          <p className="text-xl text-sage max-w-2xl mx-auto">
            La plateforme qui unit la passion agricole et les opportunités
            d'investissement pour créer un impact durable sur nos communautés
          </p>
        </div>
        {/* Auth Options */}
        <div className="flex justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
