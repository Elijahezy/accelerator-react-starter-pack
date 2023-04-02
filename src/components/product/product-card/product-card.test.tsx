import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import ProductCard from './product-card';
import { makeFakeGuitar } from '../../../utils/mocks';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Guitar } from '../../../types/shop-types';

const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
  sortedGuitars: new Array(27).fill('').map(makeFakeGuitar),
  filterState: {
    type: [],
    strings: [],
    price: [],
    currentStrings: [],
    pagination: [0, 9],
  },
  comments: [],
  cart: new Array(27).fill('').map(makeFakeGuitar),
};

const mockSetStateIsAddToCartModal = jest.fn();
const mockSetStateIsAddToCartSuccessModal = jest.fn();

describe('Component: ProductCard', () => {

  jest.mock('react', () => ({
    useState: (initial: boolean) => [initial, mockSetStateIsAddToCartModal],
  }));

  jest.mock('react', () => ({
    useState: (initial: Guitar) => [initial, mockSetStateIsAddToCartSuccessModal],
  }));

  test('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <ProductCard guitar={makeFakeGuitar()} onSetIsAddToCartModal={mockSetStateIsAddToCartModal} onSetGuitarToAddToCart={mockSetStateIsAddToCartSuccessModal} />,
        </Router>,
      </Provider>,
    );
    const imgElement = screen.getByText(/Рейтинг:/i);

    expect(imgElement).toBeInTheDocument();
  });
});

export {

};
