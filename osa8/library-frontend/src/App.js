import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const ME = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

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
    author {name}
    published
    genres
  }
}
`

const BOOKS_OF_GENRE = gql`
  query findBooksByGenre($genreToSearch: String!) {
    allBooks(genre: $genreToSearch) {
      title
      author {name}
      published
    }
  }
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    name: $author,
    published: $publishedInt,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState('all genres')
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      dataInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  })
  const [login] = useMutation(LOGIN, {
    onError: handleError,
    refetchQueries: [{ query: ME }],
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        {errorMessage &&
          <div style={{ color: 'red' }}>
            {errorMessage}
          </div>
        }
        <Authors show={page === 'authors'} result={authors} handleError={handleError} token={token} />
        <Books show={page === 'books'} result={books} genre={genre} setGenre={setGenre} BOOKS_OF_GENRE={BOOKS_OF_GENRE} />
        <LoginForm
          show={page === 'login'}
          login={login}
          setToken={(token) => setToken(token)}
          setPage={setPage}
          setGenre={setGenre}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }
      <Authors show={page === 'authors'} result={authors} handleError={handleError} token={token} ALL_AUTHORS={ALL_AUTHORS} />
      <Books show={page === 'books'} result={books} genre={genre} setGenre={setGenre} BOOKS_OF_GENRE={BOOKS_OF_GENRE} />
      <NewBook show={page === 'add'} addBook={addBook} />
      <Recommendations show={page === 'recommend'} BOOKS_OF_GENRE={BOOKS_OF_GENRE} user={user} />

    </div>
  )
}

export default App
