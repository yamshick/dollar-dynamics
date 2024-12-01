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
    onUpdateWidget,
id}) => {

    const [rubblesAmount, setRubblesAmount] = useState(rubblesAmountProp)
    const [dollarToRub, setDollarToRub] = useState(dollarToRubProp)
    const [dollarToRubCustom, setDollarToRubCustom] = useState(dollarToRubCustomProp)

    useEffect(() => {
        setRubblesAmount(rubblesAmountProp)
        setDollarToRub(dollarToRubProp)
        setDollarToRubCustom(dollarToRubCustomProp)
    }, [
        rubblesAmountProp, dollarToRubProp, dollarToRubCustomProp
    ])

    const onDeleteClick = () => onDeleteWidgetButtonClick(id)

    const actualDollarAmount = Math.round(rubblesAmount / dollarToRubCustom)
    const officialDollarAmount = Math.round(rubblesAmount / dollarToRub)
    const dollarAmountDelta = Math.round(rubblesAmount / dollarToRubCustom - rubblesAmount / dollarToRub)

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
                <Typography>Doolar cur</Typography> 
                <TextInput value={dollarToRubCustom} setValue={setDollarToRubCustom} type='number'/>
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h4'>Actual Amount: <DollarSign/>{numberWithSpaces(actualDollarAmount)}</Typography> 
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h4'>Official Amount: <DollarSign/>{numberWithSpaces(officialDollarAmount)}</Typography> 
            </div>
            <div className={styles.widgetItem}>
                <Typography variant='h4'>
                    {dollarAmountDelta > 0 ? <span style={{color: 'green'}}>
                        &uarr; {dollarAmountDelta}
                    </span> : <span style={{color: 'red'}}>
                        &darr; {dollarAmountDelta}
                    </span>
                    }
                </Typography> 
            </div>
        </div>
    )
}