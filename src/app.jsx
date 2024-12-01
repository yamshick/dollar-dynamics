import { useEffect, useState } from "react";
import "./app.css";

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
    console.log({text})
  } catch(e) {
    setError(e)
  }

  return {cur, error}
}

export const App = () => {

  // const {cbCur, cbCurError} = useFetchCbCur()


  const [dollarToRub, setDollarToRub] = useState('')


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
      console.warn(response)

      if (!response.ok) {
        throw new Error('CB CUR RESPONSE IN ERROR')
      }
      const text = await response.json()
      console.log({text})
      const dollar = text.Valute.USD.Value
      setDollarToRub(dollar)
    } catch(e) {
      console.error(e)
    }
  }
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

  return <h1>{dollarToRub}</h1>;
};
