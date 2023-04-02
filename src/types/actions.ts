import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { addDiscount, addGuitarToCart, deleteGuitarFromCart, deleteOneGuitarFromCart, updateFilter, updateGuitars, uploadComments, uploadGuitars } from '../store/actions';
import { State } from './state';

enum ActionTypes {
  UpdateGuitars = 'data/updateGuitars',
  UploadGuitars = 'data/uploadGuitars',
  UpdateFilter = 'filter/updateFilter',
  UploadComments = 'data/uploadComments',
  AddGuitarToCart = 'cart/addGuitarToCart',
  DeleteGuitarFromCart = 'cart/deleteGuitarFromCart',
  DeleteOneGuitarFromCart = 'cart/deleteOneGuitarFromCart',
  AddMultipleGuitarsToCart = 'cart/addMultipleGuitarsToCart',
  AddDiscount = 'cart/addDiscount'

}

type Actions =
  | ReturnType<typeof updateGuitars>
  | ReturnType<typeof uploadGuitars>
  | ReturnType<typeof updateFilter>
  | ReturnType<typeof uploadComments>
  | ReturnType<typeof addGuitarToCart>
  | ReturnType<typeof deleteGuitarFromCart>
  | ReturnType<typeof deleteOneGuitarFromCart>
  | ReturnType<typeof addDiscount>


type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export {
  ActionTypes
};

export type {
  ThunkActionResult,
  ThunkAppDispatch
};
