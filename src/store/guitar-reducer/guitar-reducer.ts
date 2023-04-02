import { createReducer } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { addDiscount, addGuitarToCart, addMultipleGuitarsToCart, deleteGuitarFromCart, deleteOneGuitarFromCart, updateFilter, updateGuitars, uploadComments, uploadGuitars } from '../actions';

const initialState: State = {
  guitars: [],
  sortedGuitars: [],
  filterState: {
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

const guitarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(uploadGuitars, (state, action) => {
      const guitars = action.payload;

      state.guitars = guitars;
    })
    .addCase(updateGuitars, (state, action) => {
      const guitars = action.payload;

      state.sortedGuitars = guitars;
    })
    .addCase(updateFilter, (state, action) => {
      const filter = action.payload;

      state.filterState = filter;
    })
    .addCase(uploadComments, (state, action) => {
      const comments = action.payload;

      state.comments = comments;
    })
    .addCase(addGuitarToCart, (state, action) => {
      const guitar = action.payload;

      state.cart = [...state.cart, guitar];
    })
    .addCase(deleteGuitarFromCart, (state, action) => {
      const guitar = action.payload;

      state.cart = state.cart.filter((guitarInCart) => guitarInCart.id !== guitar.id);
    })
    .addCase(deleteOneGuitarFromCart, (state, action) => {
      const guitar = action.payload;

      const lastIndexOfGuitar = state.cart.map((cartItem) => cartItem.id).lastIndexOf(guitar.id);
      state.cart = state.cart.filter((cartItem, index) => index !== lastIndexOfGuitar);
    })
    .addCase(addMultipleGuitarsToCart, (state, action) => {
      const guitars = action.payload;
      const amountOfExistingGuitarsInCart = state.cart.filter((guitarInCart) => guitarInCart.id === guitars[0].id).length;


      if (guitars.length > amountOfExistingGuitarsInCart) {
        state.cart = state.cart.concat(guitars.slice(0, guitars.length - amountOfExistingGuitarsInCart));
        return;
      }

      while (state.cart.filter((guitar) => guitar.id === guitars[0].id).length > guitars.length) {
        const lastIndexOfGuitar = state.cart.map((cartItem) => cartItem.id).lastIndexOf(guitars[0].id);
        state.cart = state.cart.filter((cartItem, index) => index !== lastIndexOfGuitar);
      }
    })
    .addCase(addDiscount, (state, action) => {
      const discount = action.payload;
      state.discount = discount;
    });
});

export { guitarReducer };

