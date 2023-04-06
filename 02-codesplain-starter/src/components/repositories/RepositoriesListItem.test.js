import { render, screen, act } from '@testing-library/react'
import RepositoriesListItem from './RepositoriesListItem'
import { MemoryRouter } from 'react-router-dom'

/**
 * When trying to import the Original FileIcon, jest will use the following mock
 * This is used to skip over a component that is causing trouble in tests
 */
// jest.mock('../tree/FileIcon', () => {
//   // Contents of FileIcon.js
//   return () => {
//     return 'File Icon Component'
//   }
// })

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'javascript',
    description: 'A JS library',
    owner: {
      login: 'facebook'
    },
    name: 'react',
    html_url: 'https://github.com/facebook/react'
  }
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  )

  return { repository }
}

/**
 * Para este caso, el test nos da un warning relacionado con act().
 * Realmente NO deberíamos hacer uso de act().
 * En cambio, podríamos usar findBy...() o findAllBy...()
 * Si vemos que no tenemos posibilidad de usar estos métodos,
 * podemos hacer uso de lo siguiente (en order de mejor a peor recomendación de uso):
 * - usar act() para contoler cuando la petición se ha resuelto
 * - usar un módulo mock para evitar los errores de renderizado en el componente
 * - usar act() con una 'pausa'
 */
test('shows a link to the github homepage for this repository', async () => {
  const { repository } = renderComponent()

  // screen.debug()
  // await act(async () => await pause()) // Last case fallback

  await screen.findByRole('img', { name: 'javascript' })
  const link = screen.getByRole('link', {
    name: /github repository/i
  })
  expect(link).toHaveAttribute('href', repository.html_url)
})

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100))

test('shows a FileIcon with the appropiate icon', async () => {
  renderComponent()

  const icon = await screen.findByRole('img', { name: /javascript/i })

  expect(icon).toHaveClass('js-icon')
})

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent()

  await screen.findByRole('img', { name: /javascript/i })

  const link = await screen.findByRole('link', {
    name: new RegExp(repository.owner.login)
  })

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})
