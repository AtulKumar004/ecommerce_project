import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function ProductGrid({ products, loading, error, totalProducts }) {
  if (loading) return <LoadingSpinner message="Fetching products..." />;

  if (error) return <ErrorMessage message={error} />;

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <p className="font-semibold text-gray-700 mb-1">No products found</p>
        <p className="text-body-sm text-gray-500">Try adjusting or clearing your filters.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-body-sm text-gray-500 mb-4">{totalProducts} product{totalProducts !== 1 ? 's' : ''} found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
