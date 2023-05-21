import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

export const Radial = () => {
    const [posts, setPosts] = useState(10)
    const [users, setUsers] = useState(10)
    const [limit, setLimit] = useState(30)
    useEffect(() => {
        fetch("http://localhost:7777/posts").then((response) => response.json()).then(data => setPosts(data.length * 10) )
        fetch("http://localhost:7777/users").then((response) => response.json()).then(data => setUsers(data.length* 10))
    },[])
    const [state, setState] = useState(
        {
          
            series: [posts, users, 10, 10],
            options: {
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    name: {
                      fontSize: '22px',
                    },
                    value: {
                      fontSize: '16px',
                    },
                    total: {
                      show: true,
                      label: 'Total',
                      formatter: function (w) {
                        return 249
                      }
                    }
                  }
                }
              },
              labels: ['Users', 'Oranges', 'Bananas', 'Berries'],
            },
          
          
          }
    )
    return(
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="radialBar" width={1000} height={400} />
        </div>
    )
}