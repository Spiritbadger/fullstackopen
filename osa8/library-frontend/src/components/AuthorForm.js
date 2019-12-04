import React, { useState } from 'react'

const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    const birthYearInt = parseInt(birthYear)
    await props.editAuthor({
      variables: { name, birthYearInt }
    })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
