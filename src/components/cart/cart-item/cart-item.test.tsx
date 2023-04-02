import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import CartItem from './cart-item';

const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
  cart: new Array(27).fill('').map(makeFakeGuitar),
};

const guitar = makeFakeGuitar();

describe('Component: CartItem', () => {

  test('should render correctly', () => {
    const history = createMemoryHistory();


    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <CartItem guitar={guitar} />
        </Router>,
      </Provider>,
    );

    const headerElement = screen.getByLabelText(/Увеличить количество/i);

    expect(headerElement).toBeInTheDocument();
  });
});
