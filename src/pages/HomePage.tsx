import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Type the props of the HomePage component
interface HomePageProps {
  data: string[];
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  return (
    <div className="flex h-[calc(100vh-64px)] max-h-[100vh]">
      {/* Main content with nº images */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Catálogos de Repuestos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {data?.map((machine) => {
            if (!machine) {
              return null; // Skip rendering this machine
            }

            return (
              <div
                key={machine}
                className="rounded-lg w-full bg-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={`/${machine}.svg`}
                  alt={machine}
                  className="w-full h-[30rem] object-contain bg-slate-200"
                />
                <div className="p-4">
                  <Link
                    key={machine}
                    to={`/detail/${machine}`}
                    className="flex justify-center align-middle text-xl font-semibold w-full bg-[#04bbf1] hover:bg-[#94c12e] rounded-md shadow-sm transition-colors"
                  >
                    {machine}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
