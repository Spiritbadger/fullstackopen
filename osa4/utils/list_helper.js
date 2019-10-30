const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item['likes']
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const max = Math.max.apply(Math, blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === max)
  return { "author": favorite.author, "likes": favorite.likes, "title": favorite.title }
}

const mostBlogs = (blogs) => {
  return _(blogs)
    .countBy('author')
    .map((objs, key, ) => ({
      'author': key,
      'blogs': objs
    })).maxBy('blogs')
}

const mostLikes = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': _.sumBy(objs, 'likes')
    })).maxBy('likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
