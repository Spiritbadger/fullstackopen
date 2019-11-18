import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const reset = () => {
    setValue('')
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const addResources = (newResources) => {
    setResources(newResources)
  }

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  const service = {
    getAll,
    create,
    addResources
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => noteService.addResources(initialNotes))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => personService.addResources(initialPersons))
    // eslint-disable-next-line
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
      .then(data => {
        noteService.addResources(notes.concat(data))
        content.reset()
      })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
      .then(data => {
        personService.addResources(persons.concat(data))
        name.reset()
        number.reset()
      })
  }

  const removeReset = (object) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...rest } = object
    return rest
  }

  const note = removeReset(content)
  const person = removeReset(name)
  const phonenumber = removeReset(number)

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...note} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...person} /> <br />
        number <input {...phonenumber} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
