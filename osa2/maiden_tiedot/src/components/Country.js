import React from 'react'

const Country = ({ country, showCountry }) => {
    return (
        <div>
            {country.name} <button onClick={showCountry} type="submit" value={country.name}>show</button>
        </div >
    )
}

export default Country
