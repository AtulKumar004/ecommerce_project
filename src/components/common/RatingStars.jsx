export default function RatingStars({ rating, showValue = true }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-body leading-none ${star <= rounded ? 'text-amber-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
      {showValue && (
        <span className="text-body-sm text-gray-500 ml-0.5">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
