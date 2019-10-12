import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setpersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.some(existing => existing.name === personObject.name)) {
            window.alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNumber('')
        }
        else {
            setpersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} searchTerm={searchTerm} />
        </div>
    )

}

export default App
