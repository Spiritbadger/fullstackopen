import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const showCountry = (event) => {
        event.preventDefault()
        setSearchTerm(event.target.value)

    }

    return (
        <div>
            <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
            <Countries countries={countries} searchTerm={searchTerm} showCountry={showCountry} />
        </div>
    )
}

export default App
