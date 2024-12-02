import { DollarSign } from "../components/dollar"
import { TextInput } from "../components/text-input"
import { MONTHLY_INCOME } from "../constants"
import { numberWithSpaces } from "../helpers/number-value-mask"
import styles from './header.css'

export const Header = ({
        dollarToRub, 
        prevDollarToRub, 
        euroToRub,
        prevEuroToRub,
        netWorthDollar,
        netWorthEuro, 
        netWorthRubble, 
        setNetWorthRubble, 
        onAddWidgetButtonClick
    }) => {

    const dollarDelta = (dollarToRub - prevDollarToRub)
    const dollarNetWorthDelta = Math.round(netWorthRubble / dollarToRub - netWorthRubble / prevDollarToRub)

    const euroDelta = (euroToRub - prevEuroToRub)
    const euroNetWorthDelta = Math.round(netWorthRubble / euroToRub - netWorthRubble / prevEuroToRub)

    const monthlyIncome = Math.round(MONTHLY_INCOME / dollarToRub)
    const montylyIncomeDelta = Math.round(MONTHLY_INCOME / dollarToRub - MONTHLY_INCOME / prevDollarToRub)

    const monthlyIncomeEuro = Math.round(MONTHLY_INCOME / euroToRub)
    const montylyIncomeDeltaEuro = Math.round(MONTHLY_INCOME / euroToRub - MONTHLY_INCOME / prevEuroToRub)

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px'}}>
            <div style={{display: 'flex', gap: '15px'}}>
                <h1 className={styles.headerItem}>
                    <DollarSign/>
                    {' '}
                    {Number(prevDollarToRub).toFixed(2)} &rarr; {Number(dollarToRub).toFixed(2)}
                    {dollarDelta > 0 ? <span style={{color: 'red'}}>
                        &uarr; {Number(dollarDelta).toFixed(2)}
                    </span> : <span style={{color: 'green'}}>
                        &darr; {Number(dollarDelta).toFixed(2)}
                    </span>
                    }
                </h1>
                <h1 className={styles.headerItem}>&#36; {' '}
                    {numberWithSpaces(netWorthDollar)}
                    {dollarNetWorthDelta > 0 ? <span style={{color: 'green'}}>
                        &uarr; {Number(dollarNetWorthDelta).toFixed(2)}
                    </span> : <span style={{color: 'red'}}>
                        &darr; {Number(dollarNetWorthDelta).toFixed(2)}
                    </span>
                    }
                </h1>
                <h1 className={styles.headerItem}>+ {' '} &#36; {' '}
                    {numberWithSpaces(monthlyIncome)}
                    {montylyIncomeDelta > 0 ? <span style={{color: 'green'}}>
                        &uarr; {Number(montylyIncomeDelta).toFixed(2)}
                    </span> : <span style={{color: 'red'}}>
                        &darr; {Number(montylyIncomeDelta).toFixed(2)}
                    </span>
                    }
                </h1>
            </div>
            <div style={{display: 'flex', gap: '15px'}}>
                <h1 className={styles.headerItem}>
                    &euro;
                    {' '}
                    {Number(prevEuroToRub).toFixed(2)} &rarr; {Number(euroToRub).toFixed(2)}
                    {dollarDelta > 0 ? <span style={{color: 'red'}}>
                        &uarr; {Number(euroDelta).toFixed(2)}
                    </span> : <span style={{color: 'green'}}>
                        &darr; {Number(euroDelta).toFixed(2)}
                    </span>
                    }
                </h1>
                <h1 className={styles.headerItem}>&euro; {' '}
                    {numberWithSpaces(netWorthEuro)}
                    {euroNetWorthDelta > 0 ? <span style={{color: 'green'}}>
                        &uarr; {Number(euroNetWorthDelta).toFixed(2)}
                    </span> : <span style={{color: 'red'}}>
                        &darr; {Number(euroNetWorthDelta).toFixed(2)}
                    </span>
                    }
                </h1>
                <h1 className={styles.headerItem}>+ {' '} &euro; {' '}
                    {numberWithSpaces(monthlyIncomeEuro)}
                    {montylyIncomeDeltaEuro > 0 ? <span style={{color: 'green'}}>
                        &uarr; {Number(montylyIncomeDeltaEuro).toFixed(2)}
                    </span> : <span style={{color: 'red'}}>
                        &darr; {Number(montylyIncomeDeltaEuro).toFixed(2)}
                    </span>
                    }
                </h1>
            </div>            
            <div style={{display: 'flex', gap: '15px'}}>
                <h1 className={styles.headerItem}>&#8381; {numberWithSpaces(netWorthRubble)}</h1>
                    <TextInput value={netWorthRubble} setValue={setNetWorthRubble} type='number'/>
                {/* <h1> */}
                    <button style={{fontSize: '50px'}} onClick={onAddWidgetButtonClick}>
                        +
                    </button>
                {/* </h1> */}
            </div>
        </div>
    )
}