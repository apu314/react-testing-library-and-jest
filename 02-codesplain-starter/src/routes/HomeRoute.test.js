import { render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { MemoryRouter } from 'react-router-dom'

import HomeRoute from './HomeRoute'
import { createServer } from '../test/server'

// GOAL:
createServer([
  {
    path: '/api/repositories',
    method: 'get',
    res: (req) => {
      const language = req.url.searchParams.get('q').split('language:')[1]
      return {
        items: [
          {
            id: 1,
            full_name: `${language}_one`
          },
          {
            id: 2,
            full_name: `${language}_two`
          }
        ]
      }
    }
  }
])

test('renders two links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  )

  const languages = ['javascript', 'typescript', 'rust', 'go', 'python', 'java']

  for (let language of languages) {
    // For each language, make sure we see two links
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`)
    })

    // Asset correct nunber of links
    expect(links).toHaveLength(2)
    // Assert that links have the aproppiate full_name
    expect(links[0]).toHaveTextContent(`${language}_one`)
    expect(links[1]).toHaveTextContent(`${language}_two`)
    //Assert anchor tags have the correct href
    expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`)
    expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`)
  }

  // await pause()
  // screen.debug()
})

const pause = () => new Promise((resolve) => setTimeout(resolve, 100))
