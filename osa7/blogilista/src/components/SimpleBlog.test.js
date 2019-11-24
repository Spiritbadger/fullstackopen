import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {

  const blog = {
    title: 'Simple blog is simple',
    author: 'Testi Testaaja',
    likes: 4
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Simple blog is simple'
  )

  expect(component.container).toHaveTextContent(
    'Testi Testaaja'
  )

  expect(component.container).toHaveTextContent(
    'blog has 4 likes'
  )

})

test('clicking the button twice calls event handler twice', async () => {

  const blog = {
    title: 'Simple blog is simple',
    author: 'Testi Testaaja',
    likes: 4
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
