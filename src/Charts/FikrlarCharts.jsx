import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

export const FikrlarCharts = ({posts}) => {
    let result = []
    const yanvar = []
    let may = []
    let fevral = []
    let mart = []
    let aprel = []
    let iyun = []
    let iyul = []
    let avgust = []
    let sentabr = []
    let oktabr = []
    let noyabr = []
    let dekabr = []
    const getFilterPosts = () => {
        for(let i = 0; i<posts.length; i++){
            let date = posts[i].date.substring(3, 5)
            if(date === "01"){
                yanvar.push(posts[i])
                result = yanvar
            }else if(date === "02"){
                fevral.push(posts[i])
                result = fevral
            }else if(date === "03"){
                mart.push(posts[i])
                result = mart
            }else if(date === "04"){
                aprel.push(posts[i])
                result = aprel
            }else if(date === "05"){
                may.push(posts[i])
                result = may
            }else if(date === "06"){
                iyun.push(posts[i])
                result = iyun
            }else if(date === "07"){
                iyul.push(posts[i])
                result = iyul
            }else if(date === "08"){
                avgust.push(posts[i])
                result = avgust
            }else if(date === "09"){
                sentabr.push(posts[i])
                result = sentabr
            }else if(date === "10"){
                oktabr.push(posts[i])
                result = oktabr
            }else if(date === "11"){
                noyabr.push(posts[i])
                result = noyabr
            }else if(date === "12"){
                dekabr.push(posts[i])
                result = dekabr
            }else{
                return false
            }
        }
        return result
    }
    const [resultPosts, setResultPosts] = useState(getFilterPosts())
    let [state, setState] = useState({
          
        series: [{
          name: 'Servings',
          data: [yanvar?.length ? resultPosts.length*10: 0, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
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
            <ReactApexChart options={state.options} series={state.series} type="bar" height={400}/>
        </div>
    )
}