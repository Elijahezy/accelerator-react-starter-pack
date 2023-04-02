import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import DeleteCart from './delete-cart';

const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
  cart: new Array(27).fill('').map(makeFakeGuitar),
};

const mockSetStateIsDelteCart = jest.fn();

const guitar = makeFakeGuitar();

describe('Component: DeleteCart', () => {
  jest.mock('react', () => ({
    useState: (initial: boolean) => [initial, mockSetStateIsDelteCart],
  }));

  test('should render correctly', () => {
    const history = createMemoryHistory();


    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <DeleteCart guitar={guitar} onSetIsDeleteCartItem={mockSetStateIsDelteCart} />
        </Router>,
      </Provider>,
    );

    const headerElement = screen.getByRole('button', { name: /Удалить товар/i });

    expect(headerElement).toBeInTheDocument();
  });
});
