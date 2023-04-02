import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import NewReview from './new-review';

const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
};
const mockSetState = jest.fn();
describe('Component: NewReview', () => {
  jest.mock('react', () => ({
    useState: (initial: boolean) => [initial, mockSetState],
  }));
  test('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <NewReview onSetIsReviewModal={mockSetState} onSetIsCongratsModal={mockSetState} />,
        </Router>,
      </Provider>,
    );
    const headerElement = screen.getByLabelText(/Ваше Имя/i);

    expect(headerElement).toBeInTheDocument();
  });
});
