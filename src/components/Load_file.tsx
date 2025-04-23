import React from "react";
import * as XLSX from "xlsx";

interface LoadFileProps {
  show: boolean;
  handleClose: () => void;
  onFileLoaded: (data: any[]) => void;
}

const LoadFile: React.FC<LoadFileProps> = ({
  show,
  handleClose,
  onFileLoaded,
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const maxColumns = 15;
        const range = XLSX.utils.decode_range(worksheet["!ref"]);

        if (range.e.c >= maxColumns) {
          range.e.c = maxColumns - 1;
          worksheet["!ref"] = XLSX.utils.encode_range(range);
        }

        const json = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        });
        onFileLoaded(json);
        handleClose();
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    show && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-sky-100 shadow-lg rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Cargar Excel
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-red-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 text-sm text-center">
              Por favor cargar el archivo Excel que contenga la disponibilidad
              de las piezas en el almacén.
            </p>
          </div>
          <div className="text-center">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="file-input w-full px-3 py-2 border rounded-lg text-gray-600 bg-gray-200 hover:bg-blue-200 focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default LoadFile;
