import { render, screen, within } from '@testing-library/react'
import UserList from './UserList'

function renderComponent() {
  const users = [
    {
      name: 'Jane',
      email: 'jane@jane.com'
    },
    {
      name: 'Sam',
      email: 'sam@sam.com'
    }
  ]

  const { container } = render(<UserList users={users} />)

  return {
    users,
    container
  }
}

// Initial Setup. Recommendation: Dont render component inside `beforeEach()`
beforeEach(() => {

})

test('should render one row per user', () => {
  // Render the component
  const { container } = renderComponent()
  // Find all the rows in the table
  // screen.logTestingPlaygroundURL()
  // const rows = screen.getAllByRole('row')
  // const rows = within(screen.getByTestId('users')).getAllByRole('row')
  // eslint-disable-next-line
  const rows = container.querySelectorAll('tbody tr')

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2)
})

test('should render the email and name of each users', () => {
  // Render the component
  const { users } = renderComponent()

  // screen.logTestingPlaygroundURL()

  // Find cells with the correct name/email
  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name })
    const email = screen.getByRole('cell', { name: user.email })

    // Assertion: should appear in document
    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
  }
})
