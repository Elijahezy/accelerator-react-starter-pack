import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
describe('Component: Footer', () => {
  it('should load footer', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history} >
        <Footer />,
      </Router>,
    );

    const headerElement = screen.getByRole('link', { name: /Возврат/i });

    expect(headerElement).toBeInTheDocument();
  });
});
