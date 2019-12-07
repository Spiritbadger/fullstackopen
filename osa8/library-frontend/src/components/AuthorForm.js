import React, { useState } from 'react'

const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const birthYearInt = parseInt(birthYear)
    await props.editAuthor({
      variables: { name, birthYearInt }
    })

    setName('')
    setBirthYear('')
  }

  if (!props.token) {
    return null
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            name:
          <select value={name} onChange={({ target }) => setName(target.value)}>
              <option value="" selected disabled hidden>choose author</option>
              {props.authors.map(a =>
                <option key={a.name} value={a.name}>{a.name}</option>
              )}
            </select>
          </label>
        </div>
        <div>
          born <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
