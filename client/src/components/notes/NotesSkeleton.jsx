const NotesSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          {/* Image skeleton */}
          <div className="h-44 animate-pulse bg-gray-200" />

          <div className="p-5">
            {/* Title */}
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

            <div className="mt-2 h-5 w-1/2 animate-pulse rounded bg-gray-200" />

            {/* Description */}
            <div className="mt-4 h-3 w-full animate-pulse rounded bg-gray-100" />
            <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-gray-100" />

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />

              <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesSkeleton;