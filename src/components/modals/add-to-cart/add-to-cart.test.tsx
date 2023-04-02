import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import AddToCart from './add-to-cart';
const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
  cart: new Array(27).fill('').map(makeFakeGuitar),
};

const mockSetStateIsAddToCartModal = jest.fn();
const mockSetStateIsAddToCartSuccessModal = jest.fn();

const guitar = makeFakeGuitar();

describe('Component: AddToCart', () => {
  jest.mock('react', () => ({
    useState: (initial: boolean) => [initial, mockSetStateIsAddToCartModal],
  }));
  jest.mock('react', () => ({
    useState: (initial: boolean) => [initial, mockSetStateIsAddToCartSuccessModal],
  }));
  test('should render correctly', () => {
    const history = createMemoryHistory();


    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <AddToCart guitarToAddToCart={guitar} onSetIsAddToCartModal={mockSetStateIsAddToCartModal} onSetIsAddToCartSuccessModal={mockSetStateIsAddToCartSuccessModal} />
        </Router>,
      </Provider>,
    );

    const headerElement = screen.getByRole('heading', { name: /Добавить товар в корзину/i });

    expect(headerElement).toBeInTheDocument();
  });
});
