import { useEffect, useState } from "react";
import FullStar from "./UI/FullStar";
import HalfStart from "./UI/HalfStart";
import EmptyStar from "./UI/EmptyStar";

function ProductList() {
  const api = "https://dummyjson.com/products";

  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  async function getAllProduct() {
    try {
      const response = await fetch(api);
      const allProducts = await response.json();
      console.log(allProducts);
      setProducts(allProducts.products);
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

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 ">
      {products.map((product: any) => (
        <div
          key={product.id}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              className="p-8 rounded-t-lg"
              src={product.thumbnail}
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              {getRatings(product.rating)}
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                {product.rating}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
              <button
                onClick={() => setCart([{ ...product }, ...cart])}
                disabled={cart.some((item) => item.id === product.id ) }
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {cart.some((item)=> item.id === product.id ) ? "In Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
