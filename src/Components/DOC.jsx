// import papa from 'papaparse';
import React, { useContext, useEffect, useState } from 'react';
import { CsvContext } from './CsvContext';
import {Line} from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS , CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

function DOC () {
  const { csvData } = useContext(CsvContext);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  // Allow user to add threshold values 
  const [threshold1, setThreshold1] = useState(1);


  useEffect(() => {

    if (csvData.length===0) return;
    // papa.parse("/MergeCustomExport.csv", {
    //   download: true,
    //   header: true,
    //   dynamicTyping: true,
    //   delimiter: ",",
    //   quoteChar: '"',

      // complete: (result) => {
      //   console.log('Raw parsed data:', result.data);

        // Filter out rows where either label or data is missing or invalid
        const filteredData = csvData.filter(
          (item) =>
            item["VirtualDistance (m)"] !== undefined &&
            item["VirtualDistance (m)"] !== null &&
            item["VirtualDistance (m)"].toString().trim() !== '' &&
            !isNaN(Number(item["VirtualDistance (m)"])) &&
            item["DepthOfCover (m)"] !== undefined &&
            item["DepthOfCover (m)"] !== null &&
            item["DepthOfCover (m)"].toString().trim() !== '' &&
            !isNaN(Number(item["DepthOfCover (m)"]))
           
        );

        const labels = filteredData
          .map((item) => Number(item["VirtualDistance (m)"]))
          .map((val) => {
            if (val >= 1000) {
              return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
              return val.toFixed(2);
            }
          });
        const dataOn = filteredData.map((item) => Number(item["DepthOfCover (m)"]));

        // console.log('Filtered Labels length:', labels.length);
        // console.log('Filtered On Potential Data length:', dataOn.length);
        // console.log('Filtered Off Potential Data length:', dataOff.length);
        // console.log('First 5 labels:', labels.slice(0, 5));
        // console.log('First 5 On Potential data points:', dataOn.slice(0, 5));
        // console.log('First 5 Off Potential data points:', dataOff.slice(0, 5));

        if (labels.length === dataOn.length) {
          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'DepthOfCover (m)',
                data: dataOn,
                borderColor: 'brown',
                backgroundColor: 'brown',
                borderWidth: 1,
                fill: false,
                tension: 0.4,
              },
            ],
          });
        } else {
          console.warn('Labels and data length mismatch');
        }
        //  },
    // });
  }, [csvData]);

     useEffect(() => {

        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Virtual Distance vs DOC',
            },
             // Adding 2 solid lines in chart
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  yMin: threshold1,
                  yMax: threshold1,
                  borderColor: 'black',
                  borderWidth: 2,

                  label:{
                    display: true,
                    content: `Threshold ${threshold1}`,
                    position: 'start',
                    color: 'red',
                    font: 5,
                  },
              },
            },
        },
        },
      });
      }, [threshold1]);
     

  return (
    <div>
      <h1>DepthOfCover (m)</h1>

       <div style={{ marginBottom: '1rem'}}>
    <label>
      Threshold1:
      <input type="number"
      value={threshold1}
      onChange={(e) => setThreshold1(Number(e.target.value))} />
    </label>
    </div>
    
      {chartData.datasets.length > 0 ? (
        <div>
          <Line options={chartOptions} data={chartData} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default DOC;
