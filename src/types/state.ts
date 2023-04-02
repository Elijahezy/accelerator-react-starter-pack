import { Comment, Guitar } from './shop-types';

type FilterState = {
  type: string[],
  strings: number[],
  price: number[],
  currentStrings: number[],
  pagination: number[]
}

type State = {
  guitars: Guitar[],
  sortedGuitars: Guitar[],
  filterState: FilterState,
  comments: Comment[],
  cart: Guitar[]
  discount: number,
}


export type { State, FilterState };
