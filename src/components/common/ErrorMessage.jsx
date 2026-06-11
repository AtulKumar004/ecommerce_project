export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <p className="font-semibold text-gray-800 mb-1">Something went wrong</p>
      <p className="text-body-sm text-gray-500 mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-secondary text-white rounded-lg text-body-sm font-medium hover:bg-secondary-dark transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
