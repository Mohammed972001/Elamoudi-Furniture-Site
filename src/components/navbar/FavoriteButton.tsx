import { Heart } from 'lucide-react';

const FavoriteButton = () => (
  <button
    className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-200 relative group"
    aria-label="المفضلة"
    type="button"
  >
    <Heart className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform" />
  </button>
);

export default FavoriteButton; 