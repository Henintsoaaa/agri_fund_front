import {
  ArrowRight,
  DollarSign,
  Leaf,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export default function InvestorDashboard() {
  const userType = "investor";

  const recentProjects = [
    {
      id: 1,
      title: "Riziculture Bio Antsirabe",
      farmer: "Rakoto Andry",
      location: "Antsirabe, Vakinankaratra",
      funding: "€15,000",
      progress: 75,
      image:
        "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: userType === "investor" ? "Investissement actif" : "En cours",
      roi: userType === "investor" ? "23%" : undefined,
    },
    {
      id: 2,
      title: "Élevage de Zébus Amélioré",
      farmer: "Rasoa Marie",
      location: "Fianarantsoa, Haute Matsiatra",
      funding: "€22,000",
      progress: 60,
      image:
        "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: userType === "investor" ? "Opportunité" : "Recherche financement",
      roi: userType === "investor" ? "18%" : undefined,
    },
    {
      id: 3,
      title: "Maraîchage Écologique",
      farmer: "Hery Rajaona",
      location: "Antananarivo, Analamanga",
      funding: "€8,500",
      progress: 90,
      image:
        "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: userType === "investor" ? "Presque financé" : "Dernière chance",
      roi: userType === "investor" ? "25%" : undefined,
    },
  ];
  const stats = [
    {
      label: "Projets investis",
      value: "8",
      icon: TrendingUp,
      color: "bg-olive",
    },
    {
      label: "Total investi",
      value: "€45,000",
      icon: DollarSign,
      color: "bg-forest",
    },
    { label: "Rendement moyen", value: "17.3%", icon: Users, color: "bg-sage" },
    {
      label: "Agriculteurs soutenus",
      value: "12",
      icon: Leaf,
      color: "bg-olive",
    },
  ];
  return (
    <div className="flex justify-center w-full">
      <div className="space-y-8 px-48 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-forest to-olive rounded-2xl p-8 text-cream">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Découvrez les opportunités d'investissement
            </h2>
            <p className="text-lg mb-6 text-cream/90">
              Investissez dans des projets agricoles durables et soutenez le
              développement rural de Madagascar.
            </p>
            <button className="bg-cream text-forest px-6 py-3 rounded-lg font-semibold hover:bg-sage hover:text-cream transition-all duration-200 shadow-lg">
              "Découvrir les projets
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-sage/10 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-sage mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-forest">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <IconComponent className="h-6 w-6 text-cream" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-lg border border-sage/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-forest">
              Projets recommandés
            </h3>
            <button className="flex items-center space-x-2 text-olive hover:text-forest transition-colors">
              <span className="text-sm font-medium">Voir tout</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="border border-sage/20 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    {project.roi && (
                      <span className="text-sm font-medium text-olive">
                        ROI: {project.roi}
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-forest mb-1">
                    {project.title}
                  </h4>
                  <p className="text-sm text-sage mb-2">
                    Par ${project.farmer}
                  </p>
                  <p className="text-xs text-sage/80 mb-3">
                    {project.location}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-olive">
                      Objectif: {project.funding}
                    </span>
                    <span className="text-sm font-medium text-forest">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="w-full bg-sage/20 rounded-full h-2 mb-4">
                    <div
                      className="bg-olive h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>

                  <button className="w-full bg-forest text-cream py-2 px-4 rounded-lg hover:bg-olive transition-colors duration-200 font-medium">
                    "Investir maintenant"
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-sage/10 rounded-xl p-8 text-center border border-sage/20">
          <h3 className="text-2xl font-bold text-forest mb-4">
            "Prêt à faire la différence ?
          </h3>
          <p className="text-sage mb-6 max-w-2xl mx-auto">
            "Rejoignez notre communauté d'investisseurs visionnaires et soutenez
            l'agriculture durable à Madagascar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-forest text-cream px-6 py-3 rounded-lg font-semibold hover:bg-olive transition-colors duration-200">
              "Explorer les projets
            </button>
            <button className="border border-forest text-forest px-6 py-3 rounded-lg font-semibold hover:bg-forest hover:text-cream transition-all duration-200">
              "Voir mes investissements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
