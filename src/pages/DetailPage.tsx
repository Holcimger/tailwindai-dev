import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

const DetailPage = ({ data }) => {
  // console.log("data :>> ", data);
  const { id } = useParams<{ id: string }>();
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Find the current image
  const Maquina = data["1"] && `${data["1"][0]["Modelo maquina"]}`;
  const currentImage = `/${Maquina}.svg`;

  if (!currentImage) {
    return <div className="p-6">Image not found</div>;
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main content with large image */}
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="p-1 flex items-end justify-between">
          <Link to="/" className="text-blue-500 hover:underline mr-4">
            &larr; Volver a Galeria
          </Link>
          <h1 className="text-2xl font-bold">{Maquina}</h1>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg h-full flex items-center justify-center">
          <img
            src={currentImage}
            alt={Maquina}
            className="object-contain bg-gray-100 max-h-full max-w-full"
          />
        </div>
      </div>

      {/* Sidebar with info buttons */}

      <div className="flex flex-col justify-start  w-64 bg-gray-200 p-2 border-l border-gray-300">
        <h2 className="w-full text-lg text-center font-semibold mb-2">
          Referencias
        </h2>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 grid-flow-row gap-4">
            {data.map((posicion, i) => {
              // console.log(`{posicion[0]} :>>`, posicion[0]["Descripción"]);
              return (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <button className="text-center py-2 px-2 w-full bg-white font-semibold hover:bg-lime-300 rounded-md shadow-sm transition-colors">
                      {i + 1} - {posicion[0]["Descripción"]}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw]">
                    <DialogHeader>
                      <DialogTitle>{posicion[0]["Descripción"]}</DialogTitle>
                    </DialogHeader>
                    <div className="flex  h-[90vh] w-full rounded-lg">
                      {/* Main content with large image */}
                      <div className="rounded-lg flex-grow overflow-hidden shadow-lg h-full flex items-center justify-center">
                        <img
                          src={`/${Maquina}_${i + 1}.svg`}
                          alt={`/${Maquina}_${i + 1}.svg`}
                          className="object-contain bg-gray-100 max-h-full max-w-full"
                        />
                      </div>

                      {/* Sidebar with info buttons */}

                      <div className="flex flex-col justify-start  w-64 bg-gray-200 p-2 border-l border-gray-300">
                        <h2 className="w-full text-lg text-center font-semibold mb-2">
                          Referencias
                        </h2>

                        <ScrollArea className="flex-1 overflow-y-auto">
                          <div className="grid grid-cols-1 grid-flow-row gap-4">
                            {posicion.map((elemento: {}, i: number) => {
                              console.log("elemento :>> ", elemento);
                              var background = "";
                              if (elemento?.["SS"] == 1)
                                background = "#ff3333"; // red
                              else if (elemento?.["SS"] >= 3)
                                background = "#99ff33"; // green
                              else if (elemento?.["SS"] >= 2)
                                background = "#ffb533"; // orange
                              else background = "white"; //

                              return (
                                <Popover key={i}>
                                  <PopoverTrigger asChild>
                                    <button
                                      className="text-center py-2 px-2 font-semibold hover:bg-lime-300 rounded-md shadow-sm transition-colors"
                                      style={{ backgroundColor: background }}
                                    >
                                      {i + 1} - {elemento?.["descripcion VTM"]}
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent className="z-50 w-64 p-4 bg-cyan-300 rounded-md shadow-lg">
                                    <h3 className="font-semibold mb-2">
                                      Detalle
                                    </h3>
                                    <p>
                                      <strong>Posición:</strong>{" "}
                                      {elemento?.["Posición2"]}
                                    </p>
                                    <p>
                                      <strong>Pieza:</strong>{" "}
                                      {elemento?.["descripcion VTM"]}
                                    </p>
                                    <p>
                                      <strong>Código catálogo:</strong>{" "}
                                      {elemento?.["Código catálogo"]}
                                    </p>
                                    <p>
                                      <strong>cod VTM:</strong>{" "}
                                      {elemento?.["cod VTM"]}
                                    </p>
                                    <p>
                                      <strong>Descripción:</strong>{" "}
                                      {elemento?.["Descripción"]}
                                    </p>
                                    <p>
                                      <strong>Diseño N°:</strong>{" "}
                                      {elemento?.["Diseño N°"]}
                                    </p>
                                    <p>
                                      <strong>Cant. conjuntos:</strong>{" "}
                                      {elemento?.["Cant. conjuntos"]}
                                    </p>

                                    <p>
                                      <strong>Cant. por conjunto:</strong>{" "}
                                      {elemento?.["Cant. por conjunto"]}
                                    </p>
                                    <p>
                                      <strong>Cant. total:</strong>{" "}
                                      {elemento?.["Cant. total"]}
                                    </p>
                                    <p>
                                      <strong>SS:</strong> {elemento?.["SS"]}
                                    </p>
                                  </PopoverContent>
                                </Popover>
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DetailPage;
