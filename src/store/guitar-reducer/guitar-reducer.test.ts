import { makeFakeGuitar } from '../../utils/mocks';
import { updateGuitars, uploadGuitars } from '../actions';
import { guitarReducer } from './guitar-reducer';

const fakeGuitar = makeFakeGuitar();
const initialFakeGuitars = new Array(15).fill('').map(makeFakeGuitar);


describe('Reducer: guitarReducer', () => {
  const state = {
    guitars: [], sortedGuitars: [], filterState: {
      type: [],
      strings: [],
      price: [],
      currentStrings: [],
      pagination: [],
    },
    comments: [],
    cart: [],
    discount: 0,
  };
  it('should update guitars', () => {


    expect(guitarReducer(state, updateGuitars([fakeGuitar]))).toEqual({
      guitars: [], sortedGuitars: [fakeGuitar], filterState: {
        type: [],
        strings: [],
        price: [],
        currentStrings: [],
        pagination: [],
      }, comments: [],
    });
  });
  it('should upload initial guitars', () => {

    expect(guitarReducer(state, uploadGuitars(initialFakeGuitars))).toEqual({
      guitars: initialFakeGuitars, sortedGuitars: [], filterState: {
        type: [],
        strings: [],
        price: [],
        currentStrings: [],
        pagination: [],
      }, comments: [],
    });
  });
});

export {

};
