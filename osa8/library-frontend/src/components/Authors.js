import React from 'react'
import AuthorForm from './AuthorForm'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $birthYearInt: Int!) {
  editAuthor(name: $name, setBornTo: $birthYearInt)  {
    name
    born
  }
}
`

const Authors = ({ result, show, handleError, token }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Mutation
        mutation={EDIT_AUTHOR} onError={handleError}
      >
        {(editAuthor) =>
          <AuthorForm editAuthor={editAuthor} authors={authors} token={token} />
        }
      </Mutation>
    </div>
  )
}

export default Authors
