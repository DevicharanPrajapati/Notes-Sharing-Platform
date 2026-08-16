const MyNotesSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          {/* Thumbnail */}
          <div className="h-44 animate-pulse bg-gray-200" />

          {/* Content */}
          <div className="p-5">
            {/* Subject */}
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />

            {/* Title */}
            <div className="mt-4 space-y-2">
              <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-3/5 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Description */}
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
            </div>

            {/* Stats */}
            <div className="mt-5 border-t border-gray-100 pt-4">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
            </div>

            {/* Actions */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
              <div className="col-span-2 h-10 animate-pulse rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyNotesSkeleton;