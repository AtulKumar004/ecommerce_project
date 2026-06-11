import { useState, useEffect } from 'react';

export default function PriceRangeFilter({ minPrice, maxPrice, onPriceChange }) {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  useEffect(() => {
    setMin(minPrice);
    setMax(maxPrice);
  }, [minPrice, maxPrice]);

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-body-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-ring focus:border-transparent';

  return (
    <div>
      <h3 className="text-body-sm font-bold text-gray-900 mb-3">Price Range</h3>
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          min="0"
          placeholder="Min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className={inputClass}
        />
        <input
          type="number"
          min="0"
          placeholder="Max"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className={inputClass}
        />
      </div>
      <button
        type="button"
        onClick={() => onPriceChange({ min, max })}
        className="w-full bg-secondary text-white py-2 rounded-lg text-body-sm font-medium hover:bg-secondary-dark transition-colors"
      >
        Apply
      </button>
    </div>
  );
}
