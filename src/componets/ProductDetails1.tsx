import { Badge, Button, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmptyStar from "./UI/EmptyStar";
import FullStar from "./UI/FullStar";
import HalfStart from "./UI/HalfStart";
import FullScreenLoader from "./UI/Loader";

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
};

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const { id } = useParams();
  const api = `https://dummyjson.com/products/${id}`;

  async function getProduct() {
    try {
      const response = await fetch(api);
      const singleProduct = await response.json();
      setProduct(singleProduct);
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
    getProduct();
  }, []);
  
  if (!product) return <FullScreenLoader />
  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery Section */}
            <div className="space-y-6">
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-lg">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product?.images?.map((img, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={img}
                      alt={`${product.title}-${index}`}
                      className="w-20 h-20 rounded-lg border-2 border-gray-200 object-cover hover:border-blue-400 transition-colors duration-200 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{product.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-green-600">${discountedPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-400 line-through">${product.price}</span>
                  <Badge color="success" size="lg">{product.discountPercentage}% Off</Badge>
                </div>
              </div>

              {/* Rating Section */}
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                {getRatings(product.rating)}
                <span className="text-lg font-semibold text-gray-700">{product.rating.toFixed(1)} / 5</span>
                <span className="text-sm text-gray-500">({product.reviews.length} reviews)</span>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3">Product Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand:</span>
                      <span className="font-medium text-gray-900">{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium text-gray-900">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SKU:</span>
                      <span className="font-medium text-gray-900">{product.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium text-gray-900">{product.weight} g</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3">Shipping & Stock</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Availability:</span>
                      <Badge color={product.availabilityStatus === 'In Stock' ? 'green' : 'red'} size="sm">
                        {product.availabilityStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stock:</span>
                      <span className="font-medium text-gray-900">{product.stock} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Order:</span>
                      <span className="font-medium text-gray-900">{product.minimumOrderQuantity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-3">
                <h3 className="font-semibold text-gray-900">Additional Information</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Dimensions:</strong> {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm</p>
                  <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                  <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                  <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  color="blue"
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Add to Cart
                </Button>
                <Button
                  color="gray"
                  outline
                  size="lg"
                  className="flex-1 border-2 hover:bg-gray-50"
                >
                  Buy Now
                </Button>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <Tooltip content={`Barcode: ${product.meta.barcode}`}>
                  <div className="p-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                    <img
                      src={product.meta.qrCode}
                      alt="QR Code"
                      className="w-20 h-20"
                    />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              {getRatings(product.rating)}
              <span className="text-lg font-semibold text-gray-700">
                {product.rating.toFixed(1)} out of 5
              </span>
            </div>
          </div>
          <div className="grid gap-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {getRatings(review.rating)}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
