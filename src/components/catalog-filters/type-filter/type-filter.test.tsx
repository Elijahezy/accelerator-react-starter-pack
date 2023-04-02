import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import TypeFilter from './type-filter';
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
};
describe('Component: TypeFilter', () => {

  test('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <TypeFilter />,
        </Router>,
      </Provider>,
    );
    const headerElement = screen.getByLabelText(/Укулеле/i);

    expect(headerElement).toBeInTheDocument();
  });
});
