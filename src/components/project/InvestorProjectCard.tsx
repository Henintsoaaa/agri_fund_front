import { Star } from "lucide-react";

interface InvestorProjectCardProps {
  id: number;
  title: string;
  farmer: string;
  location: string;
  funding: string;
  progress: number;
  image: string;
  status: string;
  roi?: string;
  userType?: string;
}

export default function InvestorProjectCard({
  title,
  farmer,
  location,
  funding,
  progress,
  image,
  roi,
}: InvestorProjectCardProps) {
  return (
    <div className="border border-sage/20 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
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
          {roi && (
            <span className="text-sm font-medium text-olive">ROI: {roi}</span>
          )}
        </div>
        <h4 className="font-semibold text-forest mb-1">{title}</h4>
        <p className="text-sm text-sage mb-2">Par {farmer}</p>
        <p className="text-xs text-sage/80 mb-3">{location}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-olive">
            Objectif: {funding}
          </span>
          <span className="text-sm font-medium text-forest">{progress}%</span>
        </div>

        <div className="w-full bg-sage/20 rounded-full h-2 mb-4">
          <div
            className="bg-olive h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <button className="w-full bg-forest text-cream py-2 px-4 rounded-lg hover:bg-olive transition-colors duration-200 font-medium">
          Investir maintenant
        </button>
      </div>
    </div>
  );
}
