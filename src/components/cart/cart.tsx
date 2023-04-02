import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Guitar } from '../../types/shop-types';
import { State } from '../../types/state';
import Footer from '../footer/footer';
import Header from '../header/header';
import CartItem from './cart-item/cart-item';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';
import { getCouponDiscount, getTotalValue, getTotalValueMinusDiscount } from '../../utils/cart';
import { postCoupon, postOrder } from '../../store/api-actions/api-actions';
import { validateCoupon } from '../../utils/validation';

function Cart() {

  const history = useHistory();
  const dispatch = useDispatch();

  const cartItems = useSelector<State, Guitar[]>((state) => state.cart);
  const couponAmount = useSelector<State, number>((state) => state.discount);

  const [couponName, setCouponName] = useState<string>('');
  const [isCouponValid, setIsCouponValid] = useState<number>(0);


  const handleCouponSubmit = () => {
    const validatedCoupon = validateCoupon(couponName).trim();
    setCouponName(validatedCoupon);
    dispatch(postCoupon({ coupon: validatedCoupon }, setIsCouponValid));
  };

  const handleOrderSubmit = () => {
    dispatch(postOrder({ coupon: couponName !== '' ? couponName : null, guitarsIds: cartItems.map((cartItem) => cartItem.id) }));
  };

  useEffect(() => {
    if (couponName === '') {
      setIsCouponValid(0);

    }
  }, [couponName]);


  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><a className="link" onClick={() => history.push('/')}>Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" onClick={() => history.push('/')}>Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Корзина</a>
            </li>
          </ul>
          <div className="cart">
            {
              [...new Set(cartItems)].map((cartItem) => <CartItem key={uniqid()} guitar={cartItem} />)
            }
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" action='/' onKeyPress={(evt) => {
                  if (evt.code === 'Enter') {
                    evt.preventDefault();
                  }
                }}
                >
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" onKeyPress={(evt) => {
                      if (evt.code === 'Enter') {
                        evt.preventDefault();
                        handleCouponSubmit();
                      }

                    }} value={couponName} onInput={(evt) => setCouponName(evt.currentTarget.value)}
                    />
                    {isCouponValid === 1 ? <p className="form-input__message form-input__message--success">Промокод принят</p> : ''}
                    {isCouponValid === 2 ? <p className="form-input__message form-input__message--error">неверный промокод</p> : ''}
                  </div>
                  <button className="button button--big coupon__button" type='button' onClick={(evt) => {
                    evt.preventDefault();
                    handleCouponSubmit();
                  }}
                  >Применить
                  </button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{getTotalValue(cartItems).toLocaleString()} ₽</span></p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className={`cart__total-value ${couponAmount !== 0 ? 'cart__total-value--bonus' : ''}`}>{couponAmount !== 0 ? getCouponDiscount(cartItems, couponAmount).toLocaleString() : 0} ₽</span>
                </p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{getTotalValueMinusDiscount(cartItems, couponAmount).toLocaleString()} ₽</span></p>
                <button className="button button--red button--big cart__order-button" onClick={() => handleOrderSubmit()}>Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
