import createAPI from '../../components/services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from 'redux';
import { ApiRoute } from '../../components/consts/api';
import { fetchGuitarsAction } from './api-actions';
import '@testing-library/jest-dom';
import 'babel-polyfill';
import { uploadGuitars } from '../actions';
describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Questions when GET /questions', async () => {
    mockAPI
      .onGet(ApiRoute.Guitars)
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      uploadGuitars([]),
    ]);
  });
});
