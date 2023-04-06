import { useDispatch, useSelector } from 'react-redux';
import { Comment, Guitar } from '../../types/shop-types';
import { FilterState, State } from '../../types/state';
import Footer from '../footer/footer';
import Header from '../header/header';
import ProductCard from '../product/product-card/product-card';
import uniqid from 'uniqid';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { sortByPrice, sortByRating } from '../../utils/utils';
import { updateGuitars } from '../../store/actions';
import Pagination from '../pagination/pagination';
import AddToCart from '../modals/add-to-cart/add-to-cart';
import AddToCartSuccess from '../modals/add-to-cart-success/add-to-cart-success';
import { EMPTY_GUITAR } from '../consts/consts';
import LoadingSpinner from "../loading-spinner/loading-spinner";

const CataloFilterPage = React.lazy(() => import('../catalog-filters/catalog-filter'));

function Main(): JSX.Element {

  const dispatch = useDispatch();

  const sortedGuitars = useSelector<State, Guitar[]>((state) => state.sortedGuitars);
  const filterState = useSelector<State, FilterState>((state) => state.filterState);
  const comments = useSelector<State, Comment[]>((state) => state.comments);
  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const [isLoading, setLoading] = useState(true)

  const [isSortedByPrice, setSortedByPrice] = useState(false);
  const [isSortedByRaiting, setSortedByRaiting] = useState(false);
  const [isSortedFromHighToLow, setSortedFromHighToLow] = useState(false);
  const [isSortedFromLowToHigh, setSortedFromLowToHigh] = useState(false);


  const [isAddToCartModal, setIsAddToCartModal] = useState(false);
  const [guitarToAddToCart, setGuitarToAddToCart] = useState<Guitar>(EMPTY_GUITAR);
  const [isAddToCartSuccessModal, setIsAddToCartSuccessModal] = useState(false);

  const memorizedGuitars = useMemo(() => sortedGuitars.map((guitar) => <ProductCard key={uniqid()} onSetGuitarToAddToCart={setGuitarToAddToCart} onSetIsAddToCartModal={setIsAddToCartModal} guitar={guitar} />), [comments, sortedGuitars]);

  useEffect(() => {
    if (isSortedByPrice) {
      dispatch(updateGuitars(sortByPrice([...sortedGuitars], isSortedFromHighToLow, isSortedFromLowToHigh)));
    }
    if (isSortedByRaiting) {
      dispatch(updateGuitars(sortByRating([...sortedGuitars], isSortedFromHighToLow, isSortedFromLowToHigh)));
    }

  }, [dispatch, isSortedByPrice, isSortedByRaiting, isSortedFromHighToLow, isSortedFromLowToHigh]);

  useEffect(() => {
    if (guitars.length !== 0) {
      setLoading(false);
    }
  }, [guitars])


  return (
    <>
      <Header />
      <main className="page-content" style={{ overflow: 'hidden' }} >
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="/">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href='/'>Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <Suspense fallback={'Data Loading...'}>
              <CataloFilterPage />

            </Suspense>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className={`catalog-sort__type-button  ${isSortedByPrice ? 'catalog-sort__type-button--active' : ''} `}
                  onClick={() => {
                    setSortedByRaiting(false); setSortedByPrice(true);
                  }}
                  aria-label="по цене"
                  tabIndex={-1}
                >по цене
                </button>
                <button
                  className={`catalog-sort__type-button  ${isSortedByRaiting ? 'catalog-sort__type-button--active' : ''} `}
                  aria-label="по популярности"
                  onClick={() => {
                    setSortedByPrice(false); setSortedByRaiting(true);
                  }}
                >по популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--up ${isSortedFromLowToHigh ? 'catalog-sort__order-button--active' : ''}`}
                  onClick={() => {
                    setSortedFromHighToLow(false); setSortedFromLowToHigh(true); isSortedByRaiting ? setSortedByPrice(false) : setSortedByPrice(true);
                  }}
                  aria-label="По возрастанию" tabIndex={-1}
                >
                </button>
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--down ${isSortedFromHighToLow ? 'catalog-sort__order-button--active' : ''}`}
                  aria-label="По убыванию"
                  tabIndex={-1}
                  onClick={() => {
                    setSortedFromLowToHigh(false); setSortedFromHighToLow(true); isSortedByRaiting ? setSortedByPrice(false) : setSortedByPrice(true);
                  }}
                >
                </button>
              </div>
            </div>
            <div className="cards catalog__cards">
              {
                isLoading ?
                  <LoadingSpinner /> :
                memorizedGuitars.slice(filterState.pagination[0], filterState.pagination[1])
              }

            </div>
            {isAddToCartModal ? <AddToCart onSetIsAddToCartSuccessModal={setIsAddToCartSuccessModal} onSetIsAddToCartModal={setIsAddToCartModal} guitarToAddToCart={guitarToAddToCart} /> : ''}
            {isAddToCartSuccessModal ? <AddToCartSuccess onSetIsAddToCartSuccessModal={setIsAddToCartSuccessModal} /> : ''}
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
