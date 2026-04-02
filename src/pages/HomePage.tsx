import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  TrendingUp,
  Shield,
  Users,
  Target,
  Leaf,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Heart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ModernHomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Investissement Sécurisé",
      description:
        "Vos investissements sont protégés et transparents grâce à notre système de validation en étapes.",
    },
    {
      icon: TrendingUp,
      title: "Rentabilité Attractive",
      description:
        "Profitez d'un ROI moyen de +12% sur vos investissements agricoles.",
    },
    {
      icon: Users,
      title: "Impact Social",
      description:
        "Soutenez directement les porteurs de projets agricoles et participez au développement local.",
    },
    {
      icon: BarChart3,
      title: "Suivi en Temps Réel",
      description:
        "Suivez l'évolution de vos investissements avec des rapports détaillés et des preuves régulières.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Créez votre compte",
      description: "Inscrivez-vous gratuitement en quelques minutes",
    },
    {
      number: "02",
      title: "Explorez les projets",
      description: "Découvrez des projets agricoles vérifiés",
    },
    {
      number: "03",
      title: "Investissez",
      description: "Choisissez un projet et investissez facilement",
    },
    {
      number: "04",
      title: "Suivez l'évolution",
      description:
        "Recevez des mises à jour régulières sur vos investissements",
    },
  ];

  const stats = [
    { value: "458KMGA", label: "Fonds levés", icon: Target },
    { value: "342", label: "Investisseurs actifs", icon: Users },
    { value: "+12%", label: "ROI moyen", icon: TrendingUp },
    { value: "76%", label: "Taux de succès", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      {/* Navigation */}
      <nav className="bg-forest/95 backdrop-blur-sm text-cream shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Sprout className="h-8 w-8 text-olive" />
              <div>
                <h1 className="text-2xl font-bold text-cream">AgriConnect</h1>
                <p className="text-xs text-sage hidden sm:block">
                  Investissez dans l'agriculture de demain
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                className="text-cream hover:bg-olive/20 hover:text-cream"
              >
                Connexion
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-olive hover:bg-olive/90 text-cream"
              >
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-olive/20 text-olive border-olive/30">
                <Leaf className="h-3 w-3 mr-1" />
                Plateforme de crowdfunding agricole
              </Badge>
              <h1 className="text-5xl sm:text-6xl font-bold text-forest leading-tight">
                Investissez dans
                <span className="text-olive"> l'agriculture</span> de demain
              </h1>
              <p className="text-xl text-sage">
                Soutenez des projets agricoles innovants tout en générant des
                revenus. Transparent, sécurisé et impactant.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/register")}
                size="lg"
                className="bg-forest hover:bg-forest/90 text-cream gap-2 text-lg px-8"
              >
                Commencer à investir
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                variant="outline"
                className="border-forest text-forest hover:bg-forest/10 text-lg px-8"
              >
                En savoir plus
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-olive" />
                <span className="text-forest font-medium">
                  Inscription gratuite
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-olive" />
                <span className="text-forest font-medium">
                  Projets vérifiés
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-olive" />
                <span className="text-forest font-medium">
                  Suivi transparent
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-olive/20 to-sage/20 rounded-3xl blur-3xl"></div>
            <Card className="relative bg-cream/50 border-sage/30 backdrop-blur-sm overflow-hidden">
              <div className="h-125 bg-linear-to-br from-olive/30 to-sage/30 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="bg-forest/10 rounded-full p-8 inline-block">
                    <Sprout className="h-32 w-32 text-olive" />
                  </div>
                  <h3 className="text-2xl font-bold text-forest">
                    Votre plateforme de confiance
                  </h3>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-forest/95 backdrop-blur-sm text-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-10 w-10 mx-auto text-olive mb-3" />
                  <div className="text-4xl font-bold text-cream mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sage">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Badge className="bg-olive/20 text-olive border-olive/30 mb-4">
            Nos Avantages
          </Badge>
          <h2 className="text-4xl font-bold text-forest mb-4">
            Pourquoi choisir AgriConnect ?
          </h2>
          <p className="text-xl text-sage max-w-2xl mx-auto">
            Une plateforme conçue pour maximiser votre impact et votre
            rentabilité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-cream/50 border-sage/30 hover:shadow-xl transition-all duration-300 hover:border-olive/50"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-olive/20">
                      <Icon className="h-6 w-6 text-olive" />
                    </div>
                    <CardTitle className="text-forest text-xl">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sage text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-linear-to-br from-sage/20 to-olive/20 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-olive/20 text-olive border-olive/30 mb-4">
              Comment ça marche
            </Badge>
            <h2 className="text-4xl font-bold text-forest mb-4">
              Commencez en 4 étapes simples
            </h2>
            <p className="text-xl text-sage max-w-2xl mx-auto">
              Un processus simple et rapide pour commencer à investir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="bg-cream/80 border-sage/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 text-9xl font-bold text-olive/5 -mr-8 -mt-8 group-hover:text-olive/10 transition-colors">
                  {step.number}
                </div>
                <CardHeader className="relative">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-forest text-cream text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <CardTitle className="text-forest">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-sage">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-linear-to-r from-forest to-olive border-0 text-cream overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <CardContent className="p-12 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl font-bold">
                Prêt à faire la différence ?
              </h2>
              <p className="text-xl text-cream/90">
                Rejoignez notre communauté d'investisseurs et soutenez
                l'agriculture durable tout en générant des revenus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  onClick={() => navigate("/register")}
                  size="lg"
                  className="bg-cream text-forest hover:bg-cream/90 text-lg px-8"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Créer mon compte
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  variant="outline"
                  className="border-cream text-cream hover:bg-cream/10 text-lg px-8"
                >
                  Découvrir les projets
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-cream py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="h-6 w-6 text-olive" />
                <span className="text-xl font-bold">AgriConnect</span>
              </div>
              <p className="text-sage text-sm">
                La plateforme de crowdfunding agricole qui connecte
                investisseurs et porteurs de projets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Plateforme</h3>
              <ul className="space-y-2 text-sage text-sm">
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Projets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Investisseurs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Porteurs de projets
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sage text-sm">
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-sage text-sm">
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    CGU
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cream transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="bg-sage/30 mb-8" />
          <div className="text-center text-sage text-sm">
            <p>© 2026 AgriConnect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
