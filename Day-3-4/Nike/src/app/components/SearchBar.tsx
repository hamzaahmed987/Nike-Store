import React, { ChangeEvent } from 'react';
type Product = {
  id: number; 
  name: string;
  price: number; 
  description?: string; 
};

type SearchBarProps = {
  products: Product;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
};
const SearchableProductList: React.FC<SearchBarProps> = ({ handleSearch, searchQuery }) => {
  return (
    <div>
      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search Products..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar" 
      />
      <div>
      
      </div>
    </div>
  );
};

export default SearchableProductList;