import React, { createContext, useState } from "react";
import Papa from "papaparse";

export const CsvContext = createContext();

export const CsvProvider = ({ children }) => {
    const [csvData, setCsvData] = useState([]);

    const handleFileUpload = (file) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                setCsvData(result.data);
            },
        });
    };

    return (
        <CsvContext.Provider value={{ csvData, handleFileUpload }}>
            {children}
        </CsvContext.Provider>
    );
};
