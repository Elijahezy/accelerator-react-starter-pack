import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import NotFoundScreen from './not-found-screen';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NotFoundScreen />,
      </Router>,
    );
    const linkElement = screen.getByRole('link', { name: /Return to main page/i });

    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <NotFoundScreen />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', { name: /Return to main page/i }));
    expect(screen.getByRole('heading', { name: /404 Page not found/i })).toBeInTheDocument();
  });
});
