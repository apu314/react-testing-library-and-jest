import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import UserForm from './UserForm'

test('it shows two inputs and a button', () => {
  // Render the component
  render(<UserForm />)
  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByRole('button')
  // Assertion - make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2)
  expect(button).toBeInTheDocument()
})


test('it calls onUserAdd when the form is submitted', async () => {
  
  /* const argList = []
  const callback = (...args) => {
    argList.push(args)
  } */
  const mock = jest.fn()
  // Try to render the component
  // render(<UserForm onUserAdd={callback} />)
  render(<UserForm onUserAdd={mock} />)

  // Find the two inputs
  // const [nameInput, emailInput] = screen.getAllByRole('textbox')
  const nameInput = screen.getByRole('textbox', { name: /name/i })
  const emailInput = screen.getByRole('textbox', { name: /email/i })

  // Simulate typing in a name
  await user.click(nameInput)
  await user.keyboard('jane')

  // Simulate typing in an email
  await user.click(emailInput)
  await user.keyboard('jane@email.com')

  // Find the button
  const button = screen.getByRole('button')

  // Simulate clicking the button
  await user.click(button)

  // Assertion to make sure 'onUserAdd' gets called with email/name
  /* expect(argList).toHaveLength(1)
  expect(argList[0][0]).toEqual({
    name: 'jane',
    email: 'jane@email.com'
  }) */
  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledWith({
    name: 'jane',
    email: 'jane@email.com'
  })
})

test('empties the two inputs when form is submitted', () => {
  // const mock = jest.fn()
  // render(<UserForm onUserAdd={mock} />)
  render(<UserForm onUserAdd={() => {}} />)

  const nameInput = screen.getByRole('textbox', { name: /name/i })
  const emailInput = screen.getByRole('textbox', { name: /email/i })
  const button = screen.getByRole('button')

  user.click(nameInput)
  user.keyboard('jane')

  user.click(emailInput)
  user.keyboard('jane@jane.com')

  user.click(button)

  expect(nameInput).toHaveValue('')
  expect(emailInput).toHaveValue('')
})
