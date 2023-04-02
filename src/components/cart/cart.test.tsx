import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import Cart from './cart';
const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
  cart: new Array(27).fill('').map(makeFakeGuitar),
};

describe('Component: Cart', () => {
  test('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Cart />
        </Router>,
      </Provider>,
    );
    const headerElement = screen.getByLabelText(/Поиск/i);
    const linkElement = screen.getByRole('heading', { name: /Корзина/i });

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
