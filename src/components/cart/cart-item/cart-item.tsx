import _ from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGuitarToCart, addMultipleGuitarsToCart, deleteOneGuitarFromCart } from '../../../store/actions';
import { Guitar } from '../../../types/shop-types';
import { State } from '../../../types/state';
import { translateNameOfGuitar } from '../../../utils/utils';
import DeleteCart from '../../modals/delete-cart/delete-cart';

const MAX_GUITAR_AMOUNT = 99;


type CartItemProps = {
  guitar: Guitar
}

function CartItem({ guitar }: CartItemProps) {

  const dispatch = useDispatch();

  const [isDeleteCartItem, setIsDeleteCartItem] = useState(false);


  const cartItems = useSelector<State, Guitar[]>((state) => state.cart);

  const handleDeleteItemFromCart = () => {
    setIsDeleteCartItem(true);
  };

  const handleAddToCart = () => {
    dispatch(addGuitarToCart(guitar));
  };

  const handleDeleteOneItemFromCart = () => {
    if (cartItems.filter((cartItem) => cartItem.id === guitar.id).length === 1) {
      setIsDeleteCartItem(true);
      return;
    }

    dispatch(deleteOneGuitarFromCart(guitar));
  };

  const handleAmountOfGuitar = useCallback(_.debounce((amountOfGuitars: string) => {
    if (parseFloat(amountOfGuitars) > MAX_GUITAR_AMOUNT) {
      amountOfGuitars = MAX_GUITAR_AMOUNT.toString();
      dispatch(addMultipleGuitarsToCart(new Array(MAX_GUITAR_AMOUNT).fill('').map(() => guitar)));
      return;
    }

    if (parseFloat(amountOfGuitars) <= 0) {
      amountOfGuitars = '1';
      dispatch(addMultipleGuitarsToCart(new Array(parseFloat(amountOfGuitars)).fill('').map(() => guitar)));
      return;
    }

    dispatch(addMultipleGuitarsToCart(new Array(parseFloat(amountOfGuitars)).fill('').map(() => guitar)));
  }, 1000), []);


  return (
    <>
      <div className="cart-item">
        <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={() => handleDeleteItemFromCart()}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
        </button>
        <div className="cart-item__image"><img src={guitar.previewImg} width="55" height="130" alt={guitar.name} />
        </div>
        <div className="product-info cart-item__info">
          <p className="product-info__title">{translateNameOfGuitar(guitar.type)} {guitar.name}</p>
          <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
          <p className="product-info__info">{translateNameOfGuitar(guitar.type)}, {guitar.stringCount} струнная</p>
        </div>
        <div className="cart-item__price">{guitar.price.toLocaleString()} ₽</div>
        <div className="quantity cart-item__quantity">
          <button className="quantity__button" aria-label="Уменьшить количество" onClick={() => handleDeleteOneItemFromCart()}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"></use>
            </svg>
          </button>
          <input className="quantity__input" type="number" onChange={(evt) => handleAmountOfGuitar(evt.currentTarget.value)} placeholder={cartItems.filter((cartItem) => cartItem.id === guitar.id).length.toString()} id="2-count" name="2-count" max="99" />
          <button className="quantity__button" aria-label="Увеличить количество" disabled={cartItems.filter((cartItem) => cartItem.id === guitar.id).length >= 99} onClick={() => handleAddToCart()}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{guitar.price.toLocaleString()} ₽</div>

      </div>
      {
        isDeleteCartItem ? <DeleteCart onSetIsDeleteCartItem={setIsDeleteCartItem} guitar={guitar} /> : ''
      }
    </>
  );
}

export default CartItem;
