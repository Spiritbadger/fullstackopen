import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/blogs`

let token = null

const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, getConfig())
  return response.data
}

const remove = async object => {
  const response = await axios.delete(`${baseUrl}/${object.id}`, getConfig())
  return response.data
}

const comment = async (blog, newObject) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, newObject)
  return response.data
}

export default { getAll, create, update, remove, setToken, destroyToken, comment }
