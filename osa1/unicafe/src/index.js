import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistics = ({ good, neutral, bad, allClicks }) => {
    if (allClicks === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <Statistic text='good' value={good} />
                    <Statistic text='neutral' value={neutral} />
                    <Statistic text='bad' value={bad} />
                    <Statistic text='all' value={allClicks} />
                    <Statistic text='average' value={(good * 1 + bad * -1) / allClicks} />
                    <Statistic text='positive' value={good / allClicks * 100 + ' %'} />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allClicks, setAll] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
        setAll(allClicks + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAll(allClicks + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
        setAll(allClicks + 1)
    }

    return (
        <div>
            <h2>give feedback</h2>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
