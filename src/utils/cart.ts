import { Guitar } from '../types/shop-types';


const getTotalValue = (cartItems: Guitar[]) => cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.price, 0);

const getCouponDiscount = (cartItems: Guitar[], couponAmount: number) => cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.price, 0) / 100 * couponAmount;

const getTotalValueMinusDiscount = (cartItems: Guitar[], couponAmount: number) => getTotalValue(cartItems) - getCouponDiscount(cartItems, couponAmount);


export {
  getTotalValue,
  getCouponDiscount,
  getTotalValueMinusDiscount
};
