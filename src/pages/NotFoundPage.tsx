import React from "react";
import { Link } from "react-router-dom";



const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-2">
        Oops! La página que buscas no existe.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFoundPage;
