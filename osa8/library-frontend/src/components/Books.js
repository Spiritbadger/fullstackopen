import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const Books = ({ result, show, genre, setGenre, BOOKS_OF_GENRE }) => {
  const client = useApolloClient(BOOKS_OF_GENRE)
  const [booksByGenre, setBooksByGenre] = useState([])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const findBooks = async (genre) => {
    const { data } = await client.query({
      query: BOOKS_OF_GENRE,
      variables: { genreToSearch: genre },
      fetchPolicy: 'no-cache'
    })
    setBooksByGenre(data.allBooks)
    setGenre(genre)
  }

  const getGenres = (bookList) => {
    let genres = []
    bookList.forEach(element => {
      element.genres.forEach(value => {
        genres.push(value)
      })
    })
    return [...new Set(genres)]
  }

  const books = result.data.allBooks
  const genres = getGenres(result.data.allBooks)

  if (genre !== 'all genres') {
    return (
      <div>
        <h2>books</h2>
        <p>in genre <b>{genre}</b></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
            </th>
              <th>
                published
            </th>
            </tr>
            {booksByGenre.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        {genres.map(genre =>
          <button key={genre} onClick={() => findBooks(genre)} >{genre}</button>
        )}
        <button onClick={() => setGenre('all genres')}>all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre =>
        <button key={genre} onClick={() => findBooks(genre)} >{genre}</button>
      )}
      <button onClick={() => setGenre('all genres')}>all genres</button>
    </div>
  )
}

export default Books
