import { screen, render } from '@testing-library/react'
import RepositoriesSummary from './RepositoriesSummary'

test('displays information about the repository', () => {
  const repository = {
    language: 'Javascript',
    stargazers_count: 5,
    forks: 30,
    open_issues: 1
  }

  render(<RepositoriesSummary repository={repository} />)

  /* const language = screen.getByText('Javascript')
  const stars = screen.getByText(5)

  expect(language).toBeInTheDocument()
  expect(stars).toBeInTheDocument() */

  for (const key in repository) {
    const value = repository[key]
    const element = screen.getByText(new RegExp(value))

    expect(element).toBeInTheDocument()
  }
})
