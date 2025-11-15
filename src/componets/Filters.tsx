import { useState } from "react";
import type { Product } from "../types";

interface FiltersProps {
  handleSearchInput: (value: string) => void;
  products: Product[];
  handleCategorySelection: (category: string) => void
  handlePrice: (minValue: number, maxValue :number )  => void
  handlePriceLowHighFilter: (value: string) => void
}

function Filters({ handleSearchInput, products, handleCategorySelection,handlePrice, handlePriceLowHighFilter }: FiltersProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filterMinValue , setFilterMinValue] = useState(0)
  const[filterMaxValue, setFilterMaxValue] = useState(0)



  const uniqueCategories: string[] = [];
  const categories = products.map((product) => product.category);
  categories.forEach((category) => {
    if (!uniqueCategories.includes(category)) uniqueCategories.push(category);
  });

  const handleSearch = () => {
    handleSearchInput(searchValue);
    
  };

  const  handleFilter = () => {
     handlePrice(filterMinValue, filterMaxValue) 
  }

  const clearSearch = () => {
    setSearchValue("");
    handleSearchInput("");
  };

  return (
    <div className="container mb-3 space-y-4">
      {/* Search Row */}
      <div className="w-full">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            id="default-search"
            className="block w-full p-4 ps-10 pe-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
            placeholder="Search Mockups, Logos..."
            required
          />

          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute end-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={handleSearch}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <select
            id="categories"
            onChange={(event) => handleCategorySelection(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose a category</option>
            {uniqueCategories.map(category => <option  key={category} value={category}>{category}</option>)}
          </select>
        </div>

        <div className="flex-1">
          <select
            id="price-sorting"
            onChange={(e)=> handlePriceLowHighFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Sort by Price</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

        <div className="flex-1">
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              placeholder="Min Price"
              onChange={(e ) => {setFilterMinValue(Number(e.target.value))}}
              className="flex-1 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="number"
              min="0"
              placeholder="Max Price"
              onChange={(e) => {setFilterMaxValue(Number( e.target.value))}}
              className="flex-1 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleFilter}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Filter
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
