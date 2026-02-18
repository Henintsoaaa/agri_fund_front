import ResetPasswordWithTokenForm from "@/components/auth/ResetPasswordWithTokenForm";
import { Sprout } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage/10 to-olive/10 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center">
              <Sprout className="h-7 w-7 text-cream" />
            </div>
            <h1 className="text-4xl font-bold text-forest">AgriConnect</h1>
          </div>
          <p className="text-lg text-sage max-w-2xl mx-auto">
            Créez un nouveau mot de passe
          </p>
        </div>
        {/* Form */}
        <div className="flex justify-center">
          <ResetPasswordWithTokenForm />
        </div>
      </div>
    </div>
  );
}
