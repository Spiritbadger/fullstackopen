const blogs = [
  {
    title: 'How to come up with an awesome blog title',
    author: 'John Doe',
    url: 'http://www.foo.bar',
    user: {
      username: 'testaaja',
      name: 'Testi Mies',
      id: '5dc30509319dd736d4213175'
    },
    likes: 1,
    id: '5dc999682330e61f340ee4ba'
  },
  {
    title: 'Writing classless JavaScript with Hooks',
    author: 'Awsum Writer',
    url: 'http://www.bar.foo',
    user: {
      username: 'testaaja',
      name: 'Testi Mies',
      id: '5dc30509319dd736d4213175'
    },
    likes: 0,
    id: '5dc9a3622330e61f340ee4bc'
  },
  {
    title: 'Test one two',
    author: 'Testi Mies',
    url: 'www.barfoo.foobar',
    user: {
      username: 'testaaja',
      name: 'Testi Mies',
      id: '5dc30509319dd736d4213175'
    },
    likes: 1,
    id: '5dcc35535176a01a4817f006'
  }
]

let token = null

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
