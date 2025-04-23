import React, { useState } from "react";
import Load_file from "@/components/Load_file";

interface DataBaseProps {
  onDataLoaded: (
    allData: { [key: string]: any },
    uniqueModels: string[]
  ) => void;
}

const DataBase: React.FC<DataBaseProps> = ({ onDataLoaded }) => {
  const [showExcel, setShowExcel] = useState(true);

  const closeExcel = () => setShowExcel(false);

  const handleFileLoaded = (data: any[]) => {
    const orderedData: any[] = [];

    const Modelos_maquinas: string[] = [];

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const maquina = element["Modelo maquina"];

      if (!Modelos_maquinas.includes(maquina)) {
        Modelos_maquinas.push(maquina);
        orderedData.push([[element]]);
      } else {
        const index = Modelos_maquinas.indexOf(maquina);
        const position = Number(element["Posición"]) - 1;
        if (orderedData[index][position])
          orderedData[index][position].push(element);
        else {
          orderedData[index].push([]);
          orderedData[index][position].push(element);
        }
      }
    }

    // console.log("orederParts :>> ", orderedData);
    // console.log("Modelos_maquinas :>> ", Modelos_maquinas);

    onDataLoaded(orderedData, Modelos_maquinas);
    // Pass the loaded data to the parent (App.tsx)

    closeExcel(); // Close the modal after loading
  };

  return (
    <div>
      {showExcel && (
        <div className="fixed inset-0 bg-opacity-25 flex justify-center items-center z-50">
          <Load_file
            show={showExcel}
            handleClose={closeExcel}
            onFileLoaded={handleFileLoaded}
          />
        </div>
      )}
    </div>
  );
};

export default DataBase;

// orderedData= [ [{…}, {…}, {…}, {…}, {…}, {…}, {…}], [{…}, {…}, {…}, {…}, {…}], etc...]

// {
//   "Proyecto   ": "K2029",
//   "Modelo maquina": "GIROMAT® EVO V12",
//   "Código catálogo": "PR15118E00",
//   "Posición": 1,
//   "Diseño N°": "NT06975DR",
//   "Cant. conjuntos": 1,
//   "Descripción": "GRUPO CODIFICADOR",
//   "Posición2": 1,
//   "cod VTM": "702676D",
//   "descripcion VTM": "POLEA",
//   "Cant. por conjunto": 1,
//   "SS": 1,
//   "Codigo": "",
//   "Columna3": "SI",
//   "Cant. total": 1
// }
