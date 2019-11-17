import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).not.toHaveTextContent(
      'How to come up with an awesome blog title'
    )
    expect(component.container).not.toHaveTextContent(
      'Writing classless JavaScript with Hooks'
    )
    expect(component.container).not.toHaveTextContent(
      'Test one two'
    )
  })

  test('if user is logged, notes are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )

    expect(component.container).toHaveTextContent(
      'How to come up with an awesome blog title'
    )
    expect(component.container).toHaveTextContent(
      'Writing classless JavaScript with Hooks'
    )
    expect(component.container).toHaveTextContent(
      'Test one two'
    )
  })
})
