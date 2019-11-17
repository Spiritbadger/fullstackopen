import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'My awesome test title',
      author: 'Testi Testaaja',
      url: 'http://www.foo.bar',
      user: {
        name: 'Testi Testaaja',
      },
      likes: 4
    }

    const user = {
      name: 'Testi Testaaja'
    }

    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('at start full info is not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the blog title, full info is displayed', () => {
    const blogTitle = component.getByText('My awesome test title')
    fireEvent.click(blogTitle)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})

