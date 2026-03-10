import { Settings, Bell, Shield, Database, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest flex items-center gap-3">
            <Settings className="h-8 w-8 text-olive" />
            Paramètres de la Plateforme
          </h1>
          <p className="text-sage text-lg">
            Configurez les paramètres globaux de l'application
          </p>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest">
                <Globe className="h-5 w-5 text-olive" />
                Paramètres Généraux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName" className="text-forest">
                  Nom de la plateforme
                </Label>
                <Input
                  id="platformName"
                  defaultValue="AgriConnect"
                  className="border-sage/30 bg-cream"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail" className="text-forest">
                  Email de support
                </Label>
                <Input
                  id="supportEmail"
                  type="email"
                  defaultValue="support@agriconnect.mg"
                  className="border-sage/30 bg-cream"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-forest">Mode maintenance</p>
                  <p className="text-sm text-sage">
                    Désactiver temporairement l'accès à la plateforme
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest">
                <Bell className="h-5 w-5 text-olive" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-forest">
                    Notifications par email
                  </p>
                  <p className="text-sm text-sage">
                    Envoyer des notifications par email aux utilisateurs
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-sage/20" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-forest">Notifications push</p>
                  <p className="text-sm text-sage">
                    Activer les notifications push pour les applications mobiles
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertes administrateur</p>
                  <p className="text-sm text-forest/60">
                    Recevoir des alertes pour les événements importants
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Authentification à deux facteurs
                  </p>
                  <p className="text-sm text-forest/60">
                    Exiger 2FA pour les comptes administrateurs
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Limite de tentatives de connexion
                  </p>
                  <p className="text-sm text-forest/60">
                    Bloquer après 5 tentatives échouées
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">
                  Délai d'expiration de session (minutes)
                </Label>
                <Input id="sessionTimeout" type="number" defaultValue="60" />
              </div>
            </CardContent>
          </Card>

          {/* Database */}
          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Base de Données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sauvegardes automatiques</p>
                  <p className="text-sm text-forest/60">
                    Effectuer des sauvegardes quotidiennes à 2h00
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline">
                  Effectuer une sauvegarde maintenant
                </Button>
                <Button variant="outline">Restaurer une sauvegarde</Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg" className="bg-forest">
              <Settings className="h-4 w-4 mr-2" />
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
