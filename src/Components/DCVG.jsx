// import papa from 'papaparse';
import React, {useContext, useEffect, useState } from 'react';
import { CsvContext } from './CsvContext';
import { Scatter } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS , CategoryScale,LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

function DCVG () {
  const {csvData} = useContext(CsvContext);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  // Allow user to add threshold values 
  const [threshold1, setThreshold1] = useState(16);

  useEffect(() => {
    if(csvData.length === 0) return;

        // Filter out rows where either label or data is missing or invalid
        const filteredData = csvData.filter(
          (item) =>
            item["VirtualDistance (m)"] !== undefined &&
            item["VirtualDistance (m)"] !== null &&
            item["VirtualDistance (m)"].toString().trim() !== '' &&
            !isNaN(Number(item["VirtualDistance (m)"])) &&
            item["DCVGPercentIR"] !== undefined &&
            item["DCVGPercentIR"] !== null &&
            item["DCVGPercentIR"].toString().trim() !== '' &&
            !isNaN(Number(item["DCVGPercentIR"]))
        );

        const scatterData = filteredData.map((item) => ({
          x: Number(item['VirtualDistance (m)']),
          y: Number(item['DCVGPercentIR']),
        }));

        const labels = filteredData
          .map((item) => Number(item["VirtualDistance (m)"]))
          .map((val) => {
            if (val >= 1000) {
              return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
              return val.toFixed(2);
            }
          });
        const dataOn = filteredData.map((item) => Number(item["DCVGPercentIR"]));

        if (labels.length === dataOn.length) {
          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'DCVGPercentIR',
                data: scatterData,
                borderColor: 'lightblue',
                backgroundColor: 'blue',
                borderWidth: 1,
                fill: false,
                tension: 0.4,
              },
            ],
          });
        } else {
          console.warn('Labels and data length mismatch');
        }

        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Virtual Distance vs DCVG',
            },
          },
        });
  }, [csvData]);

  return (
    <div>
      <h1>DCVGPercentIR</h1>

       <div style={{ marginBottom: '1rem'}}>
    <label>
      Threshold1:
      <input type="number"
      // value={threshold1}
      // onChange={(e) => setThreshold1(Number(e.target.value))} 
      />
    </label>
    </div>

      {chartData.datasets.length > 0 ? (
        <div>
          <Scatter options={chartOptions} data={chartData} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default DCVG;
