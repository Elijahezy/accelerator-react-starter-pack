import { render, screen } from '@testing-library/react';
import Header from './header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
};

describe('Component: Header', () => {
  test('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Header />,
        </Router>,
      </Provider>,
    );
    const headerElement = screen.getByLabelText(/Поиск/i);
    const linkElement = screen.getByRole('link', { name: /Где купить/i });

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
