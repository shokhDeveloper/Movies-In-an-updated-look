import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

export const FikrlarCharts = ({posts}) => {
    
    const getFilterPosts = () => {
        for(let i = 0; i<posts.length; i++){
            let date = posts[i].date.substring(3, 5)
            if(date === "01"){

            }
        }
    }
    useEffect(() => {
        getFilterPosts()
    },[getFilterPosts])
    let [state, setState] = useState({
          
        series: [{
          name: 'Servings',
          data: [10, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
        }],
        options: {
          annotations: {
            points: [{
              x: 'Bananas',
              seriesIndex: 0,
              label: {
                borderColor: '#775DD0',
                offsetY: 0,
                style: {
                  color: '#fff',
                  background: 'transparent',
                },
                text: 'Bananas are good',
              }
            }]
          },
          chart: {
            height: 350,
            type: 'bar',  
        },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: '50%',
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 2
          },
          
          grid: {
            row: {
              colors: ['#fff', '#f2f2f2']
            }
          },
          xaxis: {
            labels: {
              rotate: -45
            },
            tickPlacement: 'on'
          },
          yaxis: {
            title: {
              text: 'Servings',
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100]
            },
          }
        },
      
      
      }
      )
    return(
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350}/>
        </div>
    )
}