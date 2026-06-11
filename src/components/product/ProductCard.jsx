import { Link } from "react-router-dom";
import RatingStars from "../common/RatingStars";

export default function ProductCard({ product }) {
  const originalPrice =
    product.discountPercentage > 0
      ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md hover:border-secondary-border transition-all duration-200">
        <div className="relative overflow-hidden bg-gray-50 h-48 flex-shrink-0">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-caption font-bold px-2 py-0.5 rounded-full">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <p className="text-caption text-secondary font-medium uppercase tracking-wide capitalize mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-gray-800 text-body-sm leading-snug mb-1 line-clamp-2 flex-1">
            {product.title}
          </h3>
          {product.brand && (
            <p className="text-caption text-gray-400 mb-2">{product.brand}</p>
          )}
          <div className="flex items-center gap-1.5 mb-3">
            <RatingStars rating={product.rating} showValue={false} />
            <span className="text-caption text-gray-500">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-body font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-caption text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
