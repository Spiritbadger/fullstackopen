
require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

type Author {
  name: String!
  born: Int
  bookCount: Int
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook (
      title: String!
      name: String!
      born: Int
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      if (args.author && args.genre) {
        const author = await Author.find({ name: args.author })
        return Book.find({ author: author, genres: { $in: [args.genre] } }).populate('author', { name: 1, born: 1 })
      }
      else if (args.author) {
        const author = await Author.find({ name: args.author })
        return Book.find({ author: author }).populate('author', { name: 1, born: 1 })
      }
      else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author', { name: 1, born: 1 })
      }
      else {
        return Book.find({}).populate('author', { name: 1, born: 1 })
      }
    }
    ,
    allAuthors: (root, args) => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.find({ name: root.name })
      return Book.find({ author: author }).countDocuments()
    }
  },
  Book: {
    author: root => {
      return {
        name: root.author.name,
        born: root.author.born
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.name })
      if (!author) {
        author = new Author({ name: args.name })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author: author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
