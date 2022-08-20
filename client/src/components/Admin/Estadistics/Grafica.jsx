import React from 'react'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const Grafica = ({data}) => {
    ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

    const options = {
        indexAxis: 'y' ,
        elements: {
        bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
            plugins: {
                legend: {
                    position: 'right',
            },
            title: {
                display: true,
                text: 'Instruments mas vendidos',
            },
        },
        scales: {
            x: {
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + "%"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: "Percentage"
                }
            },
            y:{
                suggestedMin: 50,
                suggestedMax: 100
            }
         }
    };

  return (
    <div className="w-[800px]">
        <Bar data={data} options={options} />
    </div>
  )
}

export default Grafica 