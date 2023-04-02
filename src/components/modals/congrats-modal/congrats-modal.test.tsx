import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';
import CongratsModal from './congrats-modal';
const mockStore = configureMockStore();

const state = {
  guitars: new Array(27).fill('').map(makeFakeGuitar),
};
const mockSetState = jest.fn();
describe('Component: CongratsModal', () => {
  jest.mock('react', () => ({
    useState: (initial: boolean) => [initial, mockSetState],
  }));
  test('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <CongratsModal onSetIsCongratsModal={mockSetState} />,
        </Router>,
      </Provider>,
    );
    const headerElement = screen.getByText(/Спасибо за ваш отзыв!/i);

    expect(headerElement).toBeInTheDocument();
  });
});
