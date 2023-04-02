import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { updateFilter } from '../../../store/actions';
import { Guitar } from '../../../types/shop-types';
import { FilterState, State } from '../../../types/state';
import { getObjectFromQueryString, getQueryStringFromObject } from '../../../utils/utils';

function TypeFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const filterState = useSelector<State, FilterState>((state) => state.filterState);
  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);

  const [guitarTypeFilter, setGuitarTypeFilter] = useState<string[]>([]);

  useEffect(() => {
    const searchParams = getObjectFromQueryString(location.search);
    if (searchParams.type) {
      setGuitarTypeFilter(searchParams.type.slice(0, -1).split('%2C'));

    }
  }, []);


  useEffect(() => {
    const guitarStrings = guitars.filter((guitar) => guitarTypeFilter.includes(guitar.type));
    dispatch(updateFilter({ ...filterState, type: guitarTypeFilter, strings: [...new Set(guitarStrings.map((guitar) => guitar.stringCount))] }));

    if (guitarTypeFilter.length === 0) {
      dispatch(updateFilter({ ...filterState, type: guitarTypeFilter, strings: [...new Set(guitars.map((guitar) => guitar.stringCount))] }));
    }


  }, [dispatch, guitarTypeFilter, guitars]);


  const handleGuitarTypeChange = (event: FormEvent<HTMLInputElement>, type: string) => {
    const params = getObjectFromQueryString(location.search);
    if (event.currentTarget.checked) {
      params.type = getQueryStringFromObject([...guitarTypeFilter, type].join(','));
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(params),
      });
      return setGuitarTypeFilter([...guitarTypeFilter, type]);
    }
    setGuitarTypeFilter(guitarTypeFilter.filter((filter) => filter !== type));
    if (guitarTypeFilter.filter((filter) => filter !== type).length === 0) {
      const paramsEntries = new URLSearchParams(location.search);
      paramsEntries.delete('type');
      history.replace({
        pathname: '/',
        search: getQueryStringFromObject(paramsEntries),
      });
    }
  };


  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item" >
        <input className="visually-hidden"
          type="checkbox"
          id="acoustic"
          name="acoustic"
          onChange={(evt) => handleGuitarTypeChange(evt, 'acoustic')}
          checked={filterState.type.includes('acoustic')}

        />
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden"
          type="checkbox"
          id="electric"
          name="electric"
          onChange={(evt) => handleGuitarTypeChange(evt, 'electric')}
          checked={filterState.type.includes('electric')}
        />
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden"
          type="checkbox"
          id="ukulele"
          name="ukulele"
          onChange={(evt) => handleGuitarTypeChange(evt, 'ukulele')}
          checked={filterState.type.includes('ukulele')}
        />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default TypeFilter;
