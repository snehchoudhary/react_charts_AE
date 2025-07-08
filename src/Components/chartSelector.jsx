import React, {useState} from "react";
import Home from "./Home";
import ACVG from "./ACVG";
 import DCVG from "./DCVG";
import ACPSP from "./ACPSP";
import DOC from "./DOC";

const ChartSelector = () => {
    const [selectedChart, setSelectedChart] = useState([]);

    const handleCheckboxChange = (chartId) => {
       setSelectedChart((prevSelected) => 
    prevSelected.includes(chartId) ? prevSelected.filter((id) => id !== chartId): // uncheck
       [...prevSelected, chartId]
 ); // check
    };

    return (
        <div style={{ padding: "1rem"}}>
            <h2>Select a chart</h2>

            <label>
                <input type="checkbox"
                checked={selectedChart.includes("acvg")}
                onChange={() => handleCheckboxChange("acvg")} />
                ACVG_VSS_DB
            </label>

        <br />

        <label>
            <input type="checkbox"
            checked={selectedChart.includes("dcvg")}
            onChange={() => handleCheckboxChange("dcvg")} />
            DCVGPercentIR
        </label>
        <br />

        <label>
            <input type="checkbox"
            checked={selectedChart.includes("acpsp")}
            onChange={() => handleCheckboxChange("acpsp")} />
            ACPSP_OnPotential
        </label>

        <br />

          <label>
            <input type="checkbox"
            checked={selectedChart.includes("doc")}
            onChange={() => handleCheckboxChange("doc")} />
            DepthOfCover (DOC)
        </label>
        <br />

        <label>
            <input type="checkbox"
            checked={selectedChart.includes("cpcips")}
            onChange={() => handleCheckboxChange("cpcips")} />
            CPCIPS (On + Instant Off)
        </label>

       
        {selectedChart.includes("acvg") && <ACVG/>}
        {selectedChart.includes("dcvg") && <DCVG/>}
        {selectedChart.includes("acpsp") && <ACPSP/>}
        {selectedChart.includes("doc") && <DOC/>}
        {selectedChart.includes("cpcips") && <Home/>}
        </div>
        
    );
};

export default ChartSelector;