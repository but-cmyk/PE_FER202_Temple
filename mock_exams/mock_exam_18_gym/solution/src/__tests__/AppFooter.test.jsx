import { render, screen } from '@testing-library/react'
import AppFooter from '../components/AppFooter'
import about from '../data/about'

test('TODO-08: footer hiển thị copyright và version từ about.js', () => {
  const { container } = render(<AppFooter />)
  expect(container.querySelector('footer')).toBeInTheDocument()
  expect(screen.getByText(new RegExp(about.copyright.replace('©', '\\©')))).toBeInTheDocument()
  expect(screen.getByText(new RegExp(about.version))).toBeInTheDocument()
})
