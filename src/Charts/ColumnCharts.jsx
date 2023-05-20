import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts";

export const ColumnCharts = ({users}) => {  
  let result = []
  let may = []
  let yanvar = []
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
  const getUsersFilter = (users) => {
    for(let i = 0; i<users?.length; i++){
      if(users[i].date.split(" ")[0].substring(3, 5) === "01"){
        yanvar.push(users[i])
        result = yanvar
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "02"){
        fevral.push(users[i])
        result = fevral
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "03"){
        mart.push(users[i])
        result = mart
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "04"){
        aprel.push(users[i])
        result = aprel
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "05"){
        may.push(users[i])
        result = may
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "06"){
        iyun.push(users[i])
        result = iyun
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "07"){
        iyul.push(users[i])
        result = iyul
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "08"){
        avgust.push(users[i])
        result = avgust
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "09"){
        sentabr.push(users[i])
        result = sentabr
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "10"){
        oktabr.push(users[i])
        result = oktabr
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "11"){
        noyabr.push(users[i])
        result = noyabr
      }else if(users[i].date.split(" ")[0].substring(3, 5) === "12"){
        dekabr.push(users[i])
        result = dekabr
      }
      else{
        console.log("Xato")
      }
      return result?.length
    } 
  }
  useEffect(() => {
    getUsersFilter(users)
  },[getUsersFilter])
  let [resultMonth, setResultMonth] = useState(getUsersFilter(users))
  const [state, setState] = useState(  
        {
          
            series: [{
              name: 'Inflation',
              data: [may?.length ? resultMonth+1: 0, iyun?.length ? resultMonth+1: 0 , iyul?.length ? resultMonth+1: 0, avgust?.length ?resultMonth+1: 0 ,sentabr?.length ? resultMonth+1: 0, oktabr?.length ? resultMonth+1: 0 , noyabr?.length ? resultMonth+1: 0 , dekabr?.length ? resultMonth+1: 0, yanvar?.length ? resultMonth+1: 0, fevral?.length ? resultMonth+1: 0, mart?.length ? resultMonth+1: 0, ]
            }],
            options: {
              chart: {
                height: 350,
                type: 'bar',
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  dataLabels: {
                    position: 'top', // top, center, bottom
                  },
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + "ta";
                },
                offsetY: -20,
              },
              
              xaxis: {
                categories: ["May ", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr", "Yanvar", "Fevral", "Mart", "Apr"],
                position: 'top',
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false
                },
                crosshairs: {
                  fill: {
                    type: 'gradient',
                    gradient: {
                      colorFrom: '#D8E3F0',
                      colorTo: '#BED1E6',
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    }
                  }
                },
                tooltip: {
                  enabled: true,
                }
              },
              yaxis: {
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  formatter: function (val) {
                    return val + "%";
                  }
                }
              
              },
              
            },
          
          
          }
    )
    return (    
        <div id="chart">
          {resultMonth  > 0 ?(

            <ReactApexChart options={ state?.options} series={state?.series} type="bar" width={1000} height={350} />
          ) : null}
      </div>
    )
}