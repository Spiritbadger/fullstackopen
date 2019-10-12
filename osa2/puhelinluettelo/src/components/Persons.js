import React from 'react'
import Person from './Person'

const Persons = ({ persons, searchTerm }) => {

    const personsToShow = () => persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const rows = () => personsToShow().map(person =>
        <Person
            key={person.name}
            person={person}
        />
    )

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Persons
