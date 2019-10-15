import React from 'react'
import Country from './Country'
import DetailView from './DetailView'

const Countries = ({ countries, searchTerm, showCountry }) => {

    const countriesToShow = () => countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const rows = () => countriesToShow().map(country =>
        < Country
            key={country.name}
            country={country}
            showCountry={showCountry}
        />
    )

    if (countriesToShow().length === 1) {
        return (
            <DetailView country={countriesToShow()[0]} />
        )
    }
    else if (countriesToShow().length < 10) {
        return (
            <div>
                {rows()}
            </div>
        )
    }
    else {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
}

export default Countries
