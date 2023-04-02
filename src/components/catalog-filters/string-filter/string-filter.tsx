import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { updateFilter } from '../../../store/actions';
import { Guitar } from '../../../types/shop-types';
import { FilterState, State } from '../../../types/state';
import { getObjectFromQueryString, getQueryStringFromObject } from '../../../utils/utils';

function StringFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const filterState = useSelector<State, FilterState>((state) => state.filterState);
  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);

  const [checkedStrings, setCheckedStrings] = useState<number[]>([]);


  useEffect(() => {
    const checkIfTypesEqualToCurrentStrings = () => {
      const getGuitarsToFilterByPrice = () => {
        if (filterState.type.length !== 0) {
          return guitars.filter((guitar) => filterState.type.includes(guitar.type));

        }
        return guitars.filter((guitar) => ['acoustic', 'electric', 'ukulele'].includes(guitar.type));
      };
      return filterState.currentStrings.filter((currentString) => [...new Set(getGuitarsToFilterByPrice().map((guitar) => guitar.stringCount))].includes(currentString));
    };
    setCheckedStrings(checkIfTypesEqualToCurrentStrings());

  }, [filterState.type, guitars]);

  useEffect(() => {
    const searchParams = getObjectFromQueryString(location.search);
    if (searchParams.currentStrings) {
      setCheckedStrings(searchParams.currentStrings.slice(0, -1).split('%2C').map(parseFloat));
    }
  }, []);

  useEffect(() => {
    dispatch(updateFilter({ ...filterState, currentStrings: checkedStrings }));
  }, [checkedStrings]);


  const handleClickString = (event: ChangeEvent<HTMLInputElement>, stringNumber: number) => {
    const searchParams = getObjectFromQueryString(location.search);
    if (event.currentTarget.checked) {
      searchParams.currentStrings = getQueryStringFromObject([...checkedStrings, stringNumber].join(','));
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(searchParams),
      });
      return setCheckedStrings([...checkedStrings, stringNumber]);
    }
    setCheckedStrings(checkedStrings.filter((string) => string !== stringNumber));
    if (checkedStrings.filter((filter) => filter !== stringNumber).length === 0) {
      const paramsEntries = new URLSearchParams(location.search);
      paramsEntries.delete('currentStrings');
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(paramsEntries),
      });
    } else {
      searchParams.currentStrings = getQueryStringFromObject(checkedStrings.filter((stringFilter) => stringFilter !== stringNumber).join(','));
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(searchParams),
      });
    }
  };
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox"
          id="4-strings"
          name="4-strings"
          disabled={!filterState.strings.includes(4)}
          onChange={(evt) => handleClickString(evt, 4)}
          checked={filterState.currentStrings.includes(4)}
        />
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden"
          type="checkbox"
          id="6-strings"
          name="6-strings"
          disabled={!filterState.strings.includes(6)}
          onChange={(evt) => handleClickString(evt, 6)}
          checked={filterState.currentStrings.includes(6)}
        />
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden"
          type="checkbox"
          id="7-strings"
          name="7-strings"
          disabled={!filterState.strings.includes(7)}
          onChange={(evt) => handleClickString(evt, 7)}
          checked={filterState.currentStrings.includes(7)}

        />
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden"
          type="checkbox"
          id="12-strings"
          name="12-strings"
          disabled={!filterState.strings.includes(12)}
          onChange={(evt) => handleClickString(evt, 12)}
          checked={filterState.currentStrings.includes(12)}
        />
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>
  );
}

export default StringFilter;
