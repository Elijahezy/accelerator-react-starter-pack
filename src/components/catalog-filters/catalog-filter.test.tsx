import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import CatalogFilter from './catalog-filter';

const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
};

describe('Component: CatalogFilter', () => {
  test('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <CatalogFilter />,
        </Router>,
      </Provider>,
    );
    const headerElement = screen.getByLabelText(/7/i);
    const linkElement = screen.getByRole('heading', { name: /Фильтр/i });

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
