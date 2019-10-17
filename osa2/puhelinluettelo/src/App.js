import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationStatus, setNotificationStatus] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

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
            if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(n => n.name === personObject.name)
                const changedPerson = { ...person, number: newNumber }

                personService
                    .update(changedPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
                    })
                    .catch(error => {
                        setNewName('')
                        setNewNumber('')
                        setNotificationStatus('error')
                        setNotificationMessage(
                            `Information of ${changedPerson.name} has already been removed from server`
                        )
                        setTimeout(() => {
                            setNotificationMessage(null)
                            setNotificationStatus(null)
                        }, 5000)
                        setPersons(persons.filter(n => n.id !== changedPerson.id))
                    })

                setNewName('')
                setNewNumber('')
                setNotificationStatus('success')
                setNotificationMessage(
                    `Updated number for ${changedPerson.name}`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                    setNotificationStatus(null)
                }, 5000)
            }
        }
        else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
            setNotificationStatus('success')
            setNotificationMessage(
                `Added ${personObject.name}`
            )
            setTimeout(() => {
                setNotificationMessage(null)
                setNotificationStatus(null)
            }, 5000)
        }
    }

    const removePerson = (personToRemove) => {
        if (window.confirm(`Delete ${personToRemove.name} ?`)) {
            personService
                .remove(personToRemove.id)
                .then(
                    setPersons(persons.filter(person => person.id !== personToRemove.id))
                )
                .catch(error => {
                    setNewName('')
                    setNewNumber('')
                    setNotificationStatus('error')
                    setNotificationMessage(
                        `Information of ${personToRemove.name} has already been removed from server`
                    )
                    setTimeout(() => {
                        setNotificationMessage(null)
                        setNotificationStatus(null)
                    }, 5000)
                    setPersons(persons.filter(n => n.id !== personToRemove.id))
                })

            setNotificationStatus('success')
            setNotificationMessage(
                `Deleted ${personToRemove.name}`
            )
            setTimeout(() => {
                setNotificationMessage(null)
                setNotificationStatus(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notificationMessage} notificationStatus={notificationStatus} />
            <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} searchTerm={searchTerm} removePerson={removePerson} />
        </div>
    )

}

export default App
