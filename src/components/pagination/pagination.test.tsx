import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import Pagination from './pagination';
const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
  sortedGuitars: new Array(27).fill('').map(makeFakeGuitar),
};
describe('Component: Pagination', () => {

  test('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Pagination />,
        </Router>,
      </Provider>,
    );
    const headerElement = screen.getByRole('link', { name: /Назад/i });

    expect(headerElement).toBeInTheDocument();
  });
});
