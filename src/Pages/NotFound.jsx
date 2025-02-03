import { Link } from "react-router-dom";

// src/pages/NotFound.jsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <h1 className="text-9xl font-extrabold text-error mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Oops! Page Not Found</p>
      <Link
        to="/profile"
        className="btn btn-primary btn-wide shadow-md hover:shadow-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
