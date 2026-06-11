export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-secondary-border border-t-secondary rounded-full animate-spin" />
      <p className="mt-4 text-body-sm text-gray-500">{message}</p>
    </div>
  );
}
