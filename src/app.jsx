import { useEffect, useState } from "react";
import "./app.css";
import { TextInput } from "./components/text-input";
import { numberWithSpaces } from "./helpers/number-value-mask";
import { Header } from "./header/header";
import { NET_WORTH_RUBBLE } from "./constants";
import { WidgetGrid } from "./widget-grid/widget-grid";
import { DynamicsChart } from "./dynamics-chart/dynamics-chart";

const yaUrl = 'https://ya.ru'
const raUrl = 'https://www.rambler.ru/'
const currenciesURL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json'

// const cbUrl = 'https://www.cbr.ru/currency_base/daily/'
const cbUrl = 'https://www.cbr-xml-daily.ru/daily_json.js'

const useFetchCbCur = async () => {
  const [cur, setCur] = useState(0)
  const [error, setError] = useState(null)

  try {
    const response = await fetch(cbUrl)
    if (!response.ok) {
      throw new Erorr('CB CUR RESPONSE IN ERROR')
    }
    const text = response.text()
  } catch(e) {
    setError(e)
  }

  return {cur, error}
}

export const App = () => {

  // const {cbCur, cbCurError} = useFetchCbCur()

  const [netWorthRubble, setNetWorthRubble] = useState(NET_WORTH_RUBBLE)
  const [netWorthEuro, setNetWorthEuro] = useState(0)
  const [netWorthDollar, setNetWorthDollar] = useState(0)
  const [euroToRub, setEuroToRub] = useState(0)
  const [prevEuroToRub, setPrevEuroToRub] = useState(0)
  const [dollarToRub, setDollarToRub] = useState(0)
  const [prevDollarToRub, setPrevDollarToRub] = useState(0)

  const [gridWidgets, setGridWidgets] = useState([])

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await fetch(cbUrl
        // , 
        // {
        //   mode: 'no-cors',
        //   headers: {
        //     'Access-Control-Allow-Origin':'*'
        //   }}
      )

      if (!response.ok) {
        throw new Error('CB CUR RESPONSE IN ERROR')
      }
      const text = await response.json()
      const dollar = text.Valute.USD.Value
      const prDollar = text.Valute.USD.Previous
      const euro = text.Valute.EUR.Value
      const prEuro = text.Valute.EUR.Previous
      setDollarToRub(dollar)
      setPrevDollarToRub(prDollar)
      setEuroToRub(euro)
      setPrevEuroToRub(prEuro)
    } catch(e) {
      console.error(e)
    }
  }
    console.warn('fetching data')
   fetchData()
  }, [])


  // useEffect(() => {
  //   const fetchDollarCurrency = async () => {
  //     try {
  //       const response = await fetch(currenciesURL
  //       //   , 
  //       // {
  //       //   mode: 'no-cors',
  //       //   headers: {
  //       //     'Access-Control-Allow-Origin':'*'
  //       //   }}
  //       )
  //         console.log(response)
  //       // const text = await data.json()
  //       // console.log({data, text})

  //       if (response.ok) {
  //         const data = await response.json()
  //         console.log({data})
  //         const rub = data.usd.rub
  //         setDollarToRub(rub)
  //       } else {
  //         throw new Error("Requeset error")
  //       }

  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
    
  //   fetchDollarCurrency()
  // }, [])

  useEffect(() => {
    setNetWorthDollar(Math.round(netWorthRubble / dollarToRub))
    setNetWorthEuro(Math.round(netWorthRubble / euroToRub))
  }, [netWorthRubble, dollarToRub, euroToRub])

  useEffect(() => {
    setGridWidgets([{
      id: 1,
      rubblesAmount: Number(netWorthRubble),
      dollarToRub,
      prevDollarToRub,
      euroToRub,
      prevEuroToRub,
      dollarToRubCustom: dollarToRub,
      euroToRubCustom: euroToRub
    }])
  }, [
    netWorthRubble, 
    dollarToRub,
    prevDollarToRub,
    euroToRub,
    prevEuroToRub,
  ])

  const onAddWidgetButtonClick = () => {
    const newWidget = {
      id: Date.now(),
      rubblesAmount: netWorthRubble,
      dollarToRub,
      prevDollarToRub,
      euroToRub,
      prevEuroToRub,
      dollarToRubCustom: dollarToRub,
      euroToRubCustom: euroToRub
    }

    setGridWidgets([...gridWidgets, newWidget])
  }

  const onDeleteWidgetButtonClick = (widgetId) => {
    setGridWidgets(gridWidgets.filter(({id}) => id !== widgetId))
  }

  const onUpdateWidget = (newWidget) => {
    setGridWidgets(gridWidgets.map(gridWidget => {
      if (gridWidget.id === newWidget.id) {
        return newWidget
      }

      else return gridWidget
    }))
  }

  return (
    <>
      <Header 
        dollarToRub={dollarToRub} 
        prevDollarToRub={prevDollarToRub} 
        euroToRub={euroToRub}
        prevEuroToRub={prevEuroToRub}
        netWorthDollar={netWorthDollar} 
        netWorthEuro={netWorthEuro}
        netWorthRubble={netWorthRubble} 
        setNetWorthRubble={setNetWorthRubble}
        onAddWidgetButtonClick={onAddWidgetButtonClick}
      />
      <WidgetGrid gridWidgets={gridWidgets} onDeleteWidgetButtonClick={onDeleteWidgetButtonClick} onUpdateWidget={onUpdateWidget}/>
      <DynamicsChart />
    </>
  );
};
