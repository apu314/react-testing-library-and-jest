import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import App from './App'

test('can receive a new user and show it on a list', async () => {
  render(<App />)

  const nameInput = screen.getByRole('textbox', {
    name: /name/i
  })

  const emailInput = screen.getByRole('textbox', {
    name: /email/i
  })

  const button = screen.getByRole('button')

  await user.click(nameInput)
  await user.keyboard('jane')

  await user.click(emailInput)
  await user.keyboard('jane@jane.com')

  user.click(button)

  const name = await screen.findByRole('cell', {
    name: 'jane'
  })
  const email = await screen.findByRole('cell', {
    name: 'jane@jane.com'
  })

  // eslint-disable-next-line
  // screen.debug()

  expect(name).toBeInTheDocument()
  expect(email).toBeInTheDocument()
})
