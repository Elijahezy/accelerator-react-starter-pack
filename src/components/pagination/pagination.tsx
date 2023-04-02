import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { updateFilter } from '../../store/actions';
import { Guitar } from '../../types/shop-types';
import { FilterState, State } from '../../types/state';
import { getObjectFromQueryString, getQueryStringFromObject } from '../../utils/utils';

const contentPerPage = 9;
function Pagination() {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const sortedGuitars = useSelector<State, Guitar[]>((state) => state.sortedGuitars);
  const filterState = useSelector<State, FilterState>((state) => state.filterState);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [lastContentIndex, setLastContentIndex] = useState<number>(0);
  const [firstContentIndex, setFirstContentIndex] = useState<number>(0);


  useEffect(() => {
    setPageCount(Math.ceil(sortedGuitars.length / contentPerPage));
  }, [sortedGuitars.length]);

  useEffect(() => {

    if (Math.ceil(sortedGuitars.length / contentPerPage) < page && Math.ceil(sortedGuitars.length / contentPerPage) !== 0) {
      const lastContent = Math.ceil(sortedGuitars.length / contentPerPage) * contentPerPage;
      setLastContentIndex(Math.ceil(sortedGuitars.length / contentPerPage) * contentPerPage);
      setFirstContentIndex(lastContent - contentPerPage);
      setPageSafe(Math.ceil(sortedGuitars.length / contentPerPage));
      return;
    }

    const lastContent = page * contentPerPage;
    setLastContentIndex(page * contentPerPage);
    setFirstContentIndex(lastContent - contentPerPage);
  }, [page, sortedGuitars.length]);

  useEffect(() => {
    const searchParams = getObjectFromQueryString(location.search);
    if (searchParams.page) {
      setPage(parseFloat(searchParams.page.slice(0, -1)));
    }
  }, []);

  useEffect(() => {
    dispatch(updateFilter({ ...filterState, pagination: [firstContentIndex, lastContentIndex] }));

  }, [dispatch, firstContentIndex, lastContentIndex]);


  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSafe = (num: number) => {
    const searchParams = getObjectFromQueryString(location.search);

    if (num > pageCount) {
      setPage(pageCount);
      searchParams.page = getQueryStringFromObject(pageCount);
    } else if (num < 1) {
      setPage(1);
      searchParams.page = getQueryStringFromObject(1);
    } else {
      searchParams.page = getQueryStringFromObject(num);
      setPage(num);
    }

    history.replace({
      pathname: '/',
      search: getQueryStringFromObject(searchParams),
    });
  };
  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        <li className="pagination__page pagination__page--next" id="next">
          <a
            className="link pagination__page-link"

            style={{ display: page === 1 || sortedGuitars.length / contentPerPage === 0 ? 'none' : 'block' }}
            onClick={() => changePage(false)}
          >
            Назад
          </a>
        </li>
        {[...Array(pageCount).keys()].map((el) => (
          <li key={el} className="pagination__page">
            <a
              className={`link pagination__page-link ${page} ${page === el + 1 ? 'pagination__page--active' : null}`}

              onClick={() => setPageSafe(el + 1)}

            >{el + 1}
            </a>
          </li>
        ))}
        <li className="pagination__page pagination__page--next" id="next">
          <a
            className="link pagination__page-link"
            onClick={() => changePage(true)}
            style={{ display: page === pageCount || sortedGuitars.length / contentPerPage === 0 ? 'none' : 'block' }}
          >Далее
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
