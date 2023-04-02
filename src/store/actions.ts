import { ActionTypes } from '../types/actions';

import { createAction } from '@reduxjs/toolkit';
import { Comment, Guitar } from '../types/shop-types';
import { FilterState } from '../types/state';

const updateGuitars = createAction(
  ActionTypes.UpdateGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

const uploadGuitars = createAction(
  ActionTypes.UploadGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

const updateFilter = createAction(
  ActionTypes.UpdateFilter,
  (filter: FilterState) => ({
    payload: filter,
  }),
);

const uploadComments = createAction(
  ActionTypes.UploadComments,
  (comments: Comment[]) => ({
    payload: comments,
  }),
);

const addGuitarToCart = createAction(
  ActionTypes.AddGuitarToCart,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

const deleteGuitarFromCart = createAction(
  ActionTypes.DeleteGuitarFromCart,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

const deleteOneGuitarFromCart = createAction(
  ActionTypes.DeleteOneGuitarFromCart,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

const addMultipleGuitarsToCart = createAction(
  ActionTypes.AddMultipleGuitarsToCart,
  (guitar: Guitar[]) => ({
    payload: guitar,
  }),
);

const addDiscount = createAction(
  ActionTypes.AddDiscount,
  (discount: number) => ({
    payload: discount,
  }),
);

export {
  updateGuitars,
  uploadGuitars,
  updateFilter,
  uploadComments,
  addGuitarToCart,
  deleteGuitarFromCart,
  deleteOneGuitarFromCart,
  addMultipleGuitarsToCart,
  addDiscount
};
