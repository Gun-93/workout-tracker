import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-16">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline font-semibold"
      >
        Go back home
      </Link>
    </div>
  );
}
