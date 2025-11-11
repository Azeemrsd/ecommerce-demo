import { useEffect , useState} from "react"
import { useParams } from "react-router-dom"
import EmptyStar from "./UI/EmptyStar"
import FullStar from "./UI/FullStar"
import HalfStart from "./UI/HalfStart"

function ProductDetails () {
    const  [productDetail , setProductDetail] = useState<any>([])
    const {id} = useParams()

    const api = `https://dummyjson.com/products/${id}`

    async function getProduct() {
        try {
            const response =  await fetch(api)
            const singleProduct = await response.json()
            setProductDetail(singleProduct)
            
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
      getProduct()
    } , [])
    return(
        <>
        <div className="bg-blue-400 text-3xl text-center"> details of cart is working : {id} </div>
 <div
          className="w-full bg-white border border-gray-200 mb-2 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex justify-evenly items-center">
            <div className="image">
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  src={productDetail.thumbnail}
                  width={200}
                  height={200}
                  alt="productDetail image"
                />
              </a>
            </div>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{productDetail.title}</h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                {getRatings(productDetail.rating)}
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {productDetail.rating}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${productDetail.price}</span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                // onClick={() => handleQuantityDecrease(productDetail.id)}
              >
                -
              </button>
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {productDetail.quantity}
              </button>

              <button
                type="button"
                
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                // onClick={() => handleQuantityIncrease(product.id)}
              >
            
                +
              </button>
            </div>
          </div>
        </div>
      


    {/* <div className="bg-gradient-to-r from-white to-gray-50 border-t-2 border-blue-200 shadow-xl backdrop-blur-sm dark:from-gray-800 dark:to-gray-900 dark:border-blue-600 fixed bottom-0 left-0 right-0 z-10">
        <div className="w-full mx-auto max-w-screen-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 min-w-[100px]">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Items</span>
              </div>
              <span className="text-2xl font-bold text-blue-800 dark:text-blue-300">{cart.length}</span>
            </div>

            <div className="flex flex-col bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 min-w-[200px]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">VAT (5%):</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">Total:</span>
                  <span className="text-xl font-bold text-green-800 dark:text-green-300">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl text-base px-8 py-4 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 dark:focus:ring-blue-800">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L9 15v3m0-3h6"/>
                </svg>
                Checkout
              </span>
            </button>
          </div>
        </div>
    </div> */}

    </>

        
    )
} 

export default ProductDetails