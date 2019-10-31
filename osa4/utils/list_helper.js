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
  const reducer = (max, obj) => {
    return obj.likes > max.likes
      ? { 'title': obj.title, 'author': obj.author, 'likes': obj.likes }
      : { 'title': max.title, 'author': max.author, 'likes': max.likes }
  }
  return blogs.reduce(reducer)
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
