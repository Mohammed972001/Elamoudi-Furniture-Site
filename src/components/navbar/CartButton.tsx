import { ShoppingCart } from 'lucide-react';
import type { CartButtonProps } from '@/types';

const CartButton = ({ count }: CartButtonProps) => (
  <button
    className="p-2 text-gray-600 hover:text-amber-800 transition-colors duration-200 relative group"
    aria-label={`سلة التسوق - ${count} منتجات`}
    type="button"
  >
    <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform" />
    {count > 0 && (
      <span 
        className="absolute -top-1 -left-1 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
        aria-label={`${count} منتجات في السلة`}
      >
        {count}
      </span>
    )}
  </button>
);

export default CartButton; 