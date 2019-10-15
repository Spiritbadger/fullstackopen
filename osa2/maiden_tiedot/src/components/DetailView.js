import React, { useState } from 'react'
import axios from 'axios'

const DetailView = ({ country }) => {

    const [weather, setWeather] = useState('')

    const url = `http://api.weatherstack.com/current?access_key=fbecfc1e7d967e442db343aecfaffccb&query=${country.name}`

    const getWeather = () => {
        axios
            .get(url)
            .then(response => {
                setWeather(response.data.current)
            })
        return (
            <div>
                <h3>Weather in {country.capital}</h3>
                <p><b>Temperature: </b> {weather.temperature} Celsius</p>
                <img src={weather.weather_icons} alt="weather icon" />
                <p><b>Wind: </b> {weather.wind_speed} kph direction {weather.wind_dir}</p>
            </div>
        )
    }

    const rows = () => country.languages.map(language =>
        <li key={language.name}>
            {language.name}
        </li>
    )

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            {rows()}
            <br />
            <img src={country.flag} width="75px" alt="flag" />
            {getWeather()}
        </div>
    )
}

export default DetailView
