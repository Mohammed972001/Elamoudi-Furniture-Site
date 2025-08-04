import { Search } from 'lucide-react';

const SearchBar = () => (
  <div className="flex-1 max-w-xs lg:max-w-md mx-4 lg:mx-8">
    <div className="relative">
      <label htmlFor="search" className="sr-only text-black ">البحث عن المنتجات</label>
      <input
        type="search"
        id="search"
        placeholder="عن ماذا تبحث؟"
        className="w-full px-4 py-2 pr-10 text-sm text-black border border-gray-200 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-white"
        aria-label="البحث عن المنتجات في الموقع"
     
      />
      <Search 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    </div>
  </div>
);

export default SearchBar; 