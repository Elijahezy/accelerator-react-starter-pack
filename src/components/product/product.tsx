import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Comment, Guitar } from '../../types/shop-types';
import { State } from '../../types/state';
import { translateNameOfGuitar } from '../../utils/utils';
import Footer from '../footer/footer';
import Header from '../header/header';
import uniqid from 'uniqid';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewReview from '../modals/new-review/new-review';
import dayjs from 'dayjs';
import CongratsModal from '../modals/congrats-modal/congrats-modal';
import ru from 'dayjs/locale/ru';
import AddToCart from '../modals/add-to-cart/add-to-cart';
import AddToCartSuccess from '../modals/add-to-cart-success/add-to-cart-success';
import { EMPTY_GUITAR } from '../consts/consts';
import('dayjs/plugin/weekday');
dayjs.locale('ru');

const COMMENT_PER_UNIT = 3;

function Product(): JSX.Element {

  const { id } = useParams<{ id: string }>();
  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const comments = useSelector<State, Comment[]>((state) => state.comments);
  const product = guitars.find((guitar) => guitar.id === parseFloat(id));
  const currentComments = comments.filter((comment) => comment.guitarId === parseFloat(id));
  const [isDescription, setIsDescription] = useState(true);
  const [lastContentIndex, setLastContentIndex] = useState<number>(0);
  const [commentAmount, setCommentAmount] = useState(1);
  const [isShowReviewModal, setIsShowReviewModal] = useState<boolean>(false);
  const [isCongratsModal, setIsCongratsModal] = useState<boolean>(false);

  const [isAddToCartModal, setIsAddToCartModal] = useState(false);
  const [isAddToCartSuccessModal, setIsAddToCartSuccessModal] = useState(false);

  const handleShowMoreButton = () => {
    setCommentAmount(commentAmount + 1);
  };

  useEffect(() => {
    setLastContentIndex(commentAmount * COMMENT_PER_UNIT);
  }, [commentAmount]);

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{product?.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href='/'>Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href='/'>Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href='/'>{product?.name}</a>
            </li>
          </ul>
          <div className="product-container"><img className="product-container__img" src={`/${product?.previewImg}`} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{product?.name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                {new Array(Math.floor(product ? product.rating : 0)).fill('').map(() => (
                  <svg width="12" height="11" aria-hidden="true" key={uniqid()}>
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                ),

                )}
                {Math.floor(product ? product.rating : 0) < 5 ? new Array(5 - Math.floor(product ? product.rating : 0)).fill('').map(() => (
                  <svg width="12" height="11" aria-hidden="true" key={uniqid()}>
                    <use xlinkHref="#icon-star"></use>
                  </svg>)) : null}
                <span className="rate__count">{currentComments.length}</span><span className="rate__message"></span>
              </div>
              <div className="tabs"><a className={`button button--medium tabs__button ${isDescription ? '' : 'button--black-border'}`} onClick={() => setIsDescription(true)} href="#characteristics">Характеристики</a><a className={`button button--medium tabs__button ${isDescription ? 'button--black-border' : ''}`} onClick={() => setIsDescription(false)} href="#description">Описание</a>
                <div className="tabs__content" id="characteristics">
                  {isDescription ?
                    <table className="tabs__table">
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{product?.vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">{translateNameOfGuitar(product?.type)}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">{product?.stringCount} струн</td>
                        </tr>
                      </tbody>
                    </table>
                    :
                    <p className="tabs__product-description">{product?.description}</p>}
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{product?.price.toLocaleString()} ₽</p><a className="button button--red button--big product-container__button" onClick={() => setIsAddToCartModal(true)}>Добавить в корзину</a>
            </div>
          </div>
          <section className="reviews" style={{ marginBottom: currentComments.length === 0 ? '100px' : '50px' }}>
            <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href='#' onClick={() => setIsShowReviewModal(true)}>Оставить отзыв</a>
            <InfiniteScroll next={handleShowMoreButton} hasMore={commentAmount !== Math.ceil(currentComments.length / COMMENT_PER_UNIT)} loader={''} dataLength={commentAmount * 3} scrollThreshold={0.95}>
              {
                currentComments.map((comment) => (
                  <div className="review" key={uniqid()}>
                    <div className="review__wrapper">
                      <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
                      <span className="review__date">{
                        dayjs(comment?.createAt).locale(ru).format('DD MMMM')
                      }
                      </span>
                    </div>
                    <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      {new Array(Math.floor(comment ? comment.rating : 0)).fill('').map(() => (
                        <svg width="16" height="16" aria-hidden="true" key={uniqid()}>
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                      ),

                      )}
                      {Math.floor(comment ? comment.rating : 0) < 5 ? new Array(5 - Math.floor(comment ? comment.rating : 0)).fill('').map(() => (
                        <svg width="16" height="16" aria-hidden="true" key={uniqid()}>
                          <use xlinkHref="#icon-star"></use>
                        </svg>)) : null}
                      <span className="rate__count"></span><span className="rate__message"></span>
                    </div>
                    <h4 className="review__title title title--lesser">Достоинства:</h4>
                    <p className="review__value">{comment.advantage}</p>
                    <h4 className="review__title title title--lesser">Недостатки:</h4>
                    <p className="review__value">{comment.disadvantage}</p>
                    <h4 className="review__title title title--lesser">Комментарий:</h4>
                    <p className="review__value">{comment.comment}</p>
                  </div>
                )).slice(0, lastContentIndex)
              }
            </InfiniteScroll>
            <button className="button button--medium reviews__more-button" onClick={() => handleShowMoreButton()} style={{ display: commentAmount === Math.ceil(currentComments.length / COMMENT_PER_UNIT) || currentComments.length === 0 ? 'none' : 'block' }}>Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header" style={{ bottom: currentComments.length === 0 ? '-100px' : '-51px' }}>Наверх</a>
          </section>
        </div>
        {isShowReviewModal ? <NewReview onSetIsReviewModal={setIsShowReviewModal} onSetIsCongratsModal={setIsCongratsModal} /> : ''}
        {isCongratsModal ? <CongratsModal onSetIsCongratsModal={setIsCongratsModal} /> : ''}
        {isAddToCartModal ? <AddToCart onSetIsAddToCartSuccessModal={setIsAddToCartSuccessModal} onSetIsAddToCartModal={setIsAddToCartModal} guitarToAddToCart={product ? product : EMPTY_GUITAR} /> : ''}
        {isAddToCartSuccessModal ? <AddToCartSuccess onSetIsAddToCartSuccessModal={setIsAddToCartSuccessModal} /> : ''}
      </main>
      <Footer />
    </>
  );
}

export default Product;
