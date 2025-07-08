import React, { useContext } from "react";
import { CsvContext } from "./CsvContext";
import Papa from "papaparse";

function CSVUploader({ setMarkers }) {
  const { handleFileUpload } = useContext(CsvContext);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const filteredMarkers = result.data
            .filter(
              (item) =>
                item.Latitude !== undefined &&
                item.Longitude !== undefined &&
                !isNaN(item.Latitude) &&
                !isNaN(item.Longitude)
            )
            .map((item) => ({
              lat: item.Latitude,
              lng: item.Longitude,
            }));

          setMarkers(filteredMarkers);
        },
      });
    }
  };

  return (
    <div>
      <h3>Upload CSV File</h3>
      <input type="file" accept=".csv" onChange={handleChange} />
    </div>
  );
}

export default CSVUploader;
