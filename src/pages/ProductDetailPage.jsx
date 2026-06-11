import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import RatingStars from '../components/common/RatingStars';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetail(id);
  const [activeImage, setActiveImage] = useState(0);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(0);
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 py-16 max-w-5xl mx-auto">
        <LoadingSpinner message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="px-4 py-16 max-w-5xl mx-auto">
        <ErrorMessage
          message={error || 'Product not found.'}
          onRetry={() => navigate('/')}
        />
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.thumbnail];
  const originalPrice =
    product.discountPercentage > 0
      ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  const stockStatus =
    product.stock === 0
      ? { label: 'Out of Stock', color: 'text-red-600' }
      : product.stock <= 10
      ? { label: `Only ${product.stock} left`, color: 'text-orange-500' }
      : { label: `${product.stock} in stock`, color: 'text-green-600' };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-body-sm text-secondary hover:text-secondary-dark font-medium mb-6"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image Gallery */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
              <img
                src={images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === activeImage
                        ? 'border-secondary-light'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-caption bg-secondary-muted text-secondary font-semibold px-2.5 py-1 rounded-full capitalize">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-caption bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  {product.brand}
                </span>
              )}
            </div>

            <h1 className="text-heading font-bold text-gray-900 mb-3">{product.title}</h1>

            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={product.rating} />
              <span className={`text-body-sm font-medium ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-display font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {originalPrice && (
                <>
                  <span className="text-body-lg text-gray-400 line-through">${originalPrice}</span>
                  <span className="bg-green-100 text-green-700 text-body-sm font-semibold px-2 py-0.5 rounded">
                    {Math.round(product.discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>

            {product.description && (
              <div className="mb-5">
                <h2 className="text-caption font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Description
                </h2>
                <p className="text-body-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 mt-auto">
              {product.brand && (
                <div>
                  <p className="text-caption text-gray-400 uppercase tracking-wide mb-0.5">Brand</p>
                  <p className="text-body-sm font-semibold text-gray-700">{product.brand}</p>
                </div>
              )}
              <div>
                <p className="text-caption text-gray-400 uppercase tracking-wide mb-0.5">Category</p>
                <p className="text-body-sm font-semibold text-gray-700 capitalize">{product.category}</p>
              </div>
              <div>
                <p className="text-caption text-gray-400 uppercase tracking-wide mb-0.5">Rating</p>
                <p className="text-body-sm font-semibold text-gray-700">{product.rating} / 5</p>
              </div>
              <div>
                <p className="text-caption text-gray-400 uppercase tracking-wide mb-0.5">SKU</p>
                <p className="text-body-sm font-semibold text-gray-700">{product.sku || `#${product.id}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
