import { useEffect, useState } from "react";
import FullStar from "./UI/FullStar";
import HalfStart from "./UI/HalfStart";
import EmptyStar from "./UI/EmptyStar";
import { useStore } from "../GlobalStore";
import type { Product } from "../types";
import { Link } from "react-router-dom";
import Filters from "./Filters";

function ProductList() {
  const api = "https://dummyjson.com/products?limit=0";

  const [products, setProducts] = useState<Product[]>([]);
  const { cart, setCart } = useStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  async function getAllProduct() {
    try {
      const response = await fetch(api);
      const allProducts = await response.json();
      setProducts(allProducts.products);
      setFilteredProducts(allProducts.products);
    } catch (error) {
      console.log(error);
    }
  }

  const getRatings = (rating: number) => {
    const clampedRating = Math.max(0, Math.min(5, rating));
    const numArray = Array.from({ length: 5 }, (_, index) => {
      const starPosition = index + 1;
      if (clampedRating >= starPosition) return 1;
      if (clampedRating >= starPosition - 0.5) return 0.5;
      return 0;
    });

    return (
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {numArray.map((num, index) => {
          if (num === 0) return <EmptyStar key={index} />;
          if (num === 1) return <FullStar key={index} />;
          return <HalfStart key={index} />;
        })}
      </div>
    );
  };

  const handlePriceLowHighFilter = (value: string) => {
    console.log("🚀 ~ handlePriceLowHighFilter ~ value:", value);
    if (value === "low-to-high") {
      const sorted = [...filteredProducts].sort((a, b) => discountedPrice(a) - discountedPrice(b));
      setFilteredProducts(sorted);
    } else if (value === "high-to-low") {
      const sorted = [...filteredProducts].sort((a, b) => discountedPrice(b) - discountedPrice(a));
      setFilteredProducts(sorted);
    } else {
      // Reset to original products when no sorting is selected
      setFilteredProducts([...products]);
    }
  };

  const handleSearchInput = (value: string) => {
    setFilteredProducts(products.filter((product) => product.title.toLowerCase().includes(value.toLowerCase())));
  };

  const discountedPrice = (item: Product) => {
    return item.discountPercentage > 0 ? item.price * (1 - item.discountPercentage / 100) : item.price;
  };

  const handlePrice = (minValue: number, maxValue: number) => {
    if (minValue && maxValue)
      setFilteredProducts(products.filter((product) => discountedPrice(product) >= minValue && discountedPrice(product) <= maxValue));
    else setFilteredProducts(products);
  };

  const handleCategorySelection = (category: string) => {
    if (category) setFilteredProducts(products.filter((product) => product.category === category));
    else setFilteredProducts(products);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="">
        <Filters
          handlePrice={handlePrice}
          handleSearchInput={handleSearchInput}
          products={products}
          handleCategorySelection={handleCategorySelection}
          handlePriceLowHighFilter={handlePriceLowHighFilter}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        {filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={`/products/${product.id}`}>
              <img
                className="p-8 rounded-t-lg"
                src={product.thumbnail}
                alt="product image"
              />
            </Link>
            <div className="px-5 pb-5">
              <Link to={`/products/${product.id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
              </Link>
              <div className="flex items-center mt-2.5 mb-5">
                {getRatings(product.rating)}
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {product.discountPercentage > 0 ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-sm font-medium dark:bg-green-900 dark:text-green-300">
                          -{product.discountPercentage}%
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 line-through dark:text-gray-400">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  )}
                </div>
                <button
                  onClick={() => setCart([{ ...product, quantity: 1 }, ...cart])}
                  disabled={cart.some((item) => item.id === product.id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {cart.some((item) => item.id === product.id) ? "In Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
