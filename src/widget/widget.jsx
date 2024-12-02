import { useEffect, useState } from 'react'
import { TextInput } from '../components/text-input'
import styles from './widget.css'
import { Typography } from '@mui/material'
import { numberWithSpaces } from '../helpers/number-value-mask'
import { DollarSign } from '../components/dollar'

export const Widget = ({ onDeleteWidgetButtonClick, 
    rubblesAmount: rubblesAmountProp,
    dollarToRub: dollarToRubProp,
    prevDollarToRub: prevDollarToRubProp,
    dollarToRubCustom: dollarToRubCustomProp,
    euroToRub: euroToRubProp,
    prevEuroToRub: prevEuroToRubProp,
    euroToRubCustom: euroToRubCustomProp,
    onUpdateWidget,
id}) => {

    const [rubblesAmount, setRubblesAmount] = useState(rubblesAmountProp)
    const [dollarToRub, setDollarToRub] = useState(dollarToRubProp)
    const [dollarToRubCustom, setDollarToRubCustom] = useState(dollarToRubCustomProp)
    const [euroToRub, setEuroToRub] = useState(euroToRubProp)
    const [euroToRubCustom, setEuroToRubCustom] = useState(euroToRubCustomProp)

    useEffect(() => {
        setRubblesAmount(rubblesAmountProp)
        setDollarToRub(dollarToRubProp)
        setDollarToRubCustom(dollarToRubCustomProp)
        setEuroToRub(euroToRubProp)
        setEuroToRubCustom(euroToRubCustomProp)
    }, [
        rubblesAmountProp, dollarToRubProp, dollarToRubCustomProp,
        euroToRubProp, euroToRubCustomProp
    ])

    useEffect(() => {
        setDollarToRubCustom(dollarToRubCustomProp)
        setEuroToRubCustom(euroToRubCustomProp)
    }, [dollarToRubCustomProp,euroToRubCustomProp])

    const onDeleteClick = () => onDeleteWidgetButtonClick(id)

    const actualDollarAmount = Math.round(rubblesAmount / dollarToRubCustom)
    const officialDollarAmount = Math.round(rubblesAmount / dollarToRub)
    const dollarAmountDelta = Math.round(rubblesAmount / dollarToRubCustom - rubblesAmount / dollarToRub)
    const actualEuroAmount = Math.round(rubblesAmount / euroToRubCustom)
    const officialEuroAmount = Math.round(rubblesAmount / euroToRub)
    const euroAmountDelta = Math.round(rubblesAmount / euroToRubCustom - rubblesAmount / euroToRub)

    console.log({dollarToRubCustom, euroToRubCustom, dollarToRubCustomProp, euroToRubCustomProp, rubblesAmount, rubblesAmountProp})

    return (
        <div className={styles.container}>
            <div className={styles.closeButton} onClick={onDeleteClick}>
                x
            </div>            
            <div className={styles.widgetItem}>
                <Typography>Rouble Amount</Typography> 
                <TextInput value={rubblesAmount} setValue={setRubblesAmount} type='number'/>
            </div>
            <div className={styles.widgetItem}>
                <Typography>Dollar cur</Typography> 
                <TextInput value={dollarToRubCustom} setValue={setDollarToRubCustom} type='number'/>
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h6'>Actual dollar Amount: <DollarSign/>{numberWithSpaces(actualDollarAmount)}</Typography> 
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h6'>Official dollar Amount: <DollarSign/>{numberWithSpaces(officialDollarAmount)}</Typography> 
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h6'>
                    {dollarAmountDelta > 0 ? <span style={{color: 'green'}}>
                        &uarr; {dollarAmountDelta}
                    </span> : <span style={{color: 'red'}}>
                        &darr; {dollarAmountDelta}
                    </span>
                    }
                </Typography> 
            </div>
            <div className={styles.widgetItem}>
                <Typography>Euro cur</Typography> 
                <TextInput value={euroToRubCustom} setValue={setEuroToRubCustom} type='number'/>
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h6'>Actual euro Amount: <DollarSign/>{numberWithSpaces(actualEuroAmount)}</Typography> 
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h6'>Official euro Amount: <DollarSign/>{numberWithSpaces(officialEuroAmount)}</Typography> 
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h6'>
                    {euroAmountDelta > 0 ? <span style={{color: 'green'}}>
                        &uarr; {euroAmountDelta}
                    </span> : <span style={{color: 'red'}}>
                        &darr; {euroAmountDelta}
                    </span>
                    }
                </Typography> 
            </div>
        </div>
    )
}