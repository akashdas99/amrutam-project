import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold text-black">Page Not Found</h2>
        <p className="text-gray max-w-md mx-auto">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
      </div>
    </div>
  );
}
