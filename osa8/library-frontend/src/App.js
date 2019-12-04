import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author
    published
  }
}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $publishedInt,
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Query query={ALL_AUTHORS} pollInterval={2000}>
        {(result) => <Authors show={page === 'authors'} result={result} />}
      </Query>

      <Query query={ALL_BOOKS} pollInterval={2000}>
        {(result) => <Books show={page === 'books'} result={result} />}
      </Query>

      <Mutation mutation={ADD_BOOK}>
        {(addBook) =>
          <NewBook show={page === 'add'} addBook={addBook} />
        }
      </Mutation>
    </div>
  )
}

export default App
