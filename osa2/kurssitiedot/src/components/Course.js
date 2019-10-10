import React from 'react'

const Header = props =>
    <h2>{props.course}</h2>

const Total = props => {
    const total = props.parts.reduce((a, b) => ({ exercises: a.exercises + b.exercises }))
    return <b>total of {total.exercises} exercises</b>
}

const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>

const Content = props => (
    <div>
        {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)

const Course = props =>
    < div >
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div >


export default Course
