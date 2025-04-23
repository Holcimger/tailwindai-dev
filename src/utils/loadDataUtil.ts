import * as XLSX from "xlsx";

export const loadDataFromExcel = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        try {
          const data = new Uint8Array(result);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const maxColumns = 15;
          const range = XLSX.utils.decode_range(worksheet["!ref"]);
          if (range.e.c >= maxColumns) {
            range.e.c = maxColumns - 1;
            worksheet["!ref"] = XLSX.utils.encode_range(range);
          }
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          resolve(json);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error("Failed to read file as ArrayBuffer."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    reader.readAsArrayBuffer(file);
  });
};
