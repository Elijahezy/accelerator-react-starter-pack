import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Guitar } from '../../../types/shop-types';
import { State } from '../../../types/state';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';

type ProductProps = {
  guitar: Guitar,
  onSetIsAddToCartModal: Dispatch<SetStateAction<boolean>>,
  onSetGuitarToAddToCart: Dispatch<SetStateAction<Guitar>>,
}

function ProductCard({ guitar, onSetIsAddToCartModal, onSetGuitarToAddToCart }: ProductProps) {

  const history = useHistory();


  const comments = useSelector<State, Comment[]>((state) => state.comments);
  const currentComments = comments.filter((comment) => comment.guitarId === guitar.id);
  const cart = useSelector<State, Guitar[]>((state) => state.cart);

  return (

    <div className="product-card"><img src={guitar?.previewImg} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          {new Array(Math.floor(guitar.rating)).fill('').map(() => (
            <svg width="12" height="11" aria-hidden="true" key={uniqid()}>
              <use xlinkHref="#icon-full-star"></use>
            </svg>
          ),

          )}
          {Math.floor(guitar.rating) < 5 ? new Array(5 - Math.floor(guitar.rating)).fill('').map(() => (
            <svg width="12" height="11" aria-hidden="true" key={uniqid()}>
              <use xlinkHref="#icon-star"></use>
            </svg>)) : null}

          <span className="rate__count">{currentComments.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar?.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar?.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" onClick={() => history.push(`/guitars/${guitar?.id}`)} >Подробнее</a>
        {
          cart.some((cartItem) => cartItem.id === guitar.id) ?
            <div>
              <button className="button button--red-border button--mini button--in-cart" onClick={() => history.push('/cart')}>В Корзине</button>
            </div>

            :

            <a className="button button--red button--mini button--add-to-cart" onClick={() => {
              onSetIsAddToCartModal(true);
              onSetGuitarToAddToCart(guitar);

            }}
            >Купить
            </a>
        }
      </div>
    </div>

  );
}

export default React.memo(ProductCard);
