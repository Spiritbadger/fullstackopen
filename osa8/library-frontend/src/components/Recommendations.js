import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const query = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const Recommendations = ({ show, BOOKS_OF_GENRE }) => {
  const [books, setBooks] = useState([])
  const [usersGenre, setUsersGenre] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    const findUserGenre = async () => {
      const result = await client.query({
        query: query,
        fetchPolicy: 'no-cache'
      })
      setUsersGenre(result.data.me.favoriteGenre)

      const { data } = await client.query({
        query: BOOKS_OF_GENRE,
        variables: { genreToSearch: result.data.me.favoriteGenre },
        fetchPolicy: 'no-cache'
      })
      setBooks(data.allBooks)
    }
    findUserGenre()
  }, [books])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{usersGenre}</b></p>
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
