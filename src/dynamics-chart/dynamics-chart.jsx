import { useEffect, useState } from "react"
import { xml2json } from "../helpers/xml-to-json"
import ReactECharts from 'echarts-for-react';
import { DOLLAR_TO_RUB_DYNAMICS } from "../data/dollar-to-rub-dynamics";

const DYNAMICS_DOLLAR_URL = 'https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=01/01/2000&date_req2=01/12/2024&VAL_NM_RQ=R01235'

export const DynamicsChart = () => {

    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DYNAMICS_DOLLAR_URL,
                    {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'text/xml',
                        },
                      }
                )
                console.log(response)
                const data = xml2json(response)
                console.log(data)
            } catch(e) {
                console.error(e)
            }
        }

        // fetchData()
    }, [])


    // const options = {
    //     grid: { top: 8, right: 8, bottom: 24, left: 36 },
    //     xAxis: {
    //       type: 'category',
    //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //     },
    //     yAxis: {
    //       type: 'value',
    //     },
    //     series: [
    //       {
    //         data: [820, 932, 901, 934, 1290, 1330, 1320],
    //         type: 'line',
    //         smooth: true,
    //       },
    //     ],
    //     tooltip: {
    //       trigger: 'axis',
    //     },
    //   };

    const categoryData = DOLLAR_TO_RUB_DYNAMICS.map(({date}) => date)
    const valueData = DOLLAR_TO_RUB_DYNAMICS.map(({value}) => value)

    // console.log({valueData})
    const options = {
        "toolbox": {
            "feature": {
            "dataZoom": {
                "yAxisIndex": "true"
            },
            "brush": {
                "type": ['lineX', 'clear']
            }
            }
        },
        // grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
          type: 'category',
          data: categoryData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            // data: [1, 2, 3,4],
            data: valueData,
            // data: [1, 2, 3,4, 5, 6, 7, 8, 9, 10],
            type: 'line',
            smooth: true,
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
      };

      return <ReactECharts option={options} />;

}