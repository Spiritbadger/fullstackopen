import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Anecdote = ({ anecdote, votes }) => (
    <div>
        {anecdote}
        <br />
        has {votes} votes
    </div>
)

const App = (props) => {

    const [votes, setVotes] = useState(new Array(6 + 1).join('0').split('').map(parseFloat))
    const [selected, setSelected] = useState(0)

    const handleVoteClick = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    const handleNextClick = () => {
        setSelected(Math.floor(Math.random() * (5 - 0 + 1)) + 0)
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
            <Button onClick={handleVoteClick} text='vote' />
            <Button onClick={handleNextClick} text='next anecdote' />
            <h2>Anecdote with most votes</h2>
            <Anecdote anecdote={props.anecdotes[votes.indexOf(Math.max(...votes))]} votes={Math.max(...votes)} />

        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
