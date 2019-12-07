import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const Recommendations = ({ show, BOOKS_OF_GENRE, user }) => {
  const [books, setBooks] = useState([])
  const client = useApolloClient(BOOKS_OF_GENRE)

  useEffect(() => {
    const findBooks = async () => {
      const { data } = await client.query({
        query: BOOKS_OF_GENRE,
        variables: { genreToSearch: user.data.me.favoriteGenre },
        fetchPolicy: 'no-cache'
      })
      setBooks(data.allBooks)
    }

    findBooks()
  }, [user])


  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.data.me.favoriteGenre}</b></p>
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
    </div>
  )
}

export default Recommendations
