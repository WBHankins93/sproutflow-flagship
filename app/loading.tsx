export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-nature-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="mx-auto h-3 w-32 rounded-full bg-nature-100" aria-hidden="true" />
        </div>
      </div>
    )
  }
