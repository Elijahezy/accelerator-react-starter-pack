import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import Product from './product';

const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
};

describe('Component: Product', () => {
  test('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Product />,
        </Router>,
      </Provider>,
    );
    const linkElement = screen.getByRole('link', { name: /Товар/i });
    const buttonElement = screen.getByRole('button', { name: /Начать поиск/i });


    expect(buttonElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
