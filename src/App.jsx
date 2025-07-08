import React, { useState } from 'react'
import { CsvProvider } from './Components/CsvContext';

import ChartSelector from './Components/chartSelector';
import MapWrapper from './Components/MapWrapper';
import CSVUploader from './Components/CSV_Uploader';


function App() {
  const [markers, setMarkers] = useState([]);
  

  return (
    <CsvProvider>
      <div>

        <h1>CSV to Google Map</h1>
        <CSVUploader setMarkers = {setMarkers}/>
        <MapWrapper markers={markers}/>

        <h1>Pipeline Survey Charts</h1>
     <ChartSelector/>
      </div>
    </CsvProvider>
  )
}

export default App;
