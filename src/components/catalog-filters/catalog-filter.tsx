import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateFilter, updateGuitars } from '../../store/actions';
import { Guitar } from '../../types/shop-types';
import { FilterState, State } from '../../types/state';
import { getObjectFromQueryString } from '../../utils/utils';
import PriceFilter from './price-filter/price-filter';
import StringFilter from './string-filter/string-filter';
import TypeFilter from './type-filter/type-filter';

function CatalogFilter() {
  const dispatch = useDispatch();
  const location = useLocation();

  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const filterState = useSelector<State, FilterState>((state) => state.filterState);
  const searchParams = getObjectFromQueryString(location.search);


  useEffect(() => {

    if (filterState.type.length !== 0) {

      let filteredGuitars = guitars.filter((guitar) => filterState.type.includes(guitar.type));
      if (filterState.currentStrings.length !== 0) {
        filteredGuitars = filteredGuitars.filter((guitar) => filterState.currentStrings.includes(guitar.stringCount));
      }
      if (filterState.price.length !== 0) {

        dispatch(updateGuitars(filteredGuitars.filter((guitar) => guitar.price >= filterState.price[0] && filterState.price[1] >= guitar.price)));

      } else {
        dispatch(updateGuitars(filteredGuitars));
      }
    } else {

      if (filterState.price.length !== 0) {
        const filteredByPriceGuitars = guitars.filter((guitar) => guitar.price >= filterState.price[0] && filterState.price[1] >= guitar.price);
        if (filterState.currentStrings.length !== 0) {
          dispatch(updateGuitars(filteredByPriceGuitars.filter((guitar) => filterState.currentStrings.includes(guitar.stringCount))));
        } else {
          dispatch(updateGuitars(filteredByPriceGuitars));

        }

      } else {
        if (filterState.currentStrings.length !== 0) {
          dispatch(updateGuitars(guitars.filter((guitar) => filterState.currentStrings.includes(guitar.stringCount))));
        } else {

          if (searchParams.price) {
            dispatch(updateFilter({ ...filterState, price: [searchParams.price.slice(0, -1).split('%2C').map(parseFloat)[0], searchParams.price.slice(0, -1).split('%2C').map(parseFloat)[1]] }));
            dispatch(updateGuitars(guitars.filter((guitar) => guitar.price >= searchParams.price.slice(0, -1).split('%2C').map(parseFloat)[0] && guitar.price <= searchParams.price.slice(0, -1).split('%2C').map(parseFloat)[1])));
          } else {
            dispatch(updateGuitars(guitars));

          }

        }

      }
    }


  }, [dispatch, filterState, guitars]);


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <PriceFilter />
      </fieldset>
      <TypeFilter />
      <StringFilter />
    </form>
  );
}

export default CatalogFilter;
