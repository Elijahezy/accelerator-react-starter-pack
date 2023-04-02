import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Guitar } from '../../types/shop-types';
import { State } from '../../types/state';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';


function Header(): JSX.Element {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const cartItems = useSelector<State, Guitar[]>((state) => state.cart);

  const handleEnterKeyOnSearchSuggestion = (evt: KeyboardEvent<HTMLLIElement>, guitar: Guitar) => {
    if (evt.code === 'Enter') {
      history.push(`/guitars/${guitar.id}`);
    }
  };

  const memorizedSearchSuggestions = useMemo(() => guitars.filter((guitar) => {
    if (searchTerm !== '') {
      if (guitar.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return guitar;
      }
    } return null;
  }).map((guitar) => (
    <li className="form-search__select-item" tabIndex={0} onKeyUp={(evt) => handleEnterKeyOnSearchSuggestion(evt, guitar)} onClick={() => history.push(`/guitars/${guitar.id}`)} key={uniqid()}>{guitar.name}</li>
  )), [guitars, history, searchTerm]);

  const headerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (event.currentTarget !== headerRef.current) {
        setSearchTerm('');
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  }, []);


  return (
    <header className="header" id="header">
      <div className="container header__wrapper" ><a className="header__logo logo" style={{ cursor: 'pointer' }} onClick={() => history.push('/')}><img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" /></a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link" onClick={() => history.push('/')}>Каталог</a>
            </li>
            <li><a className="link main-nav__link" onClick={() => history.push('/')}>Где купить?</a>
            </li>
            <li><a className="link main-nav__link" onClick={() => history.push('/')}>О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search" ref={headerRef}>
          <form className="form-search__form" >
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" onInput={(evt) => setSearchTerm(evt.currentTarget.value)} />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          {memorizedSearchSuggestions.length !== 0 ?
            <ul className="form-search__select-list" style={{ zIndex: 10 }}>
              {
                memorizedSearchSuggestions
              }
            </ul>
            : ''}
        </div>
        <a className="header__cart-link" aria-label="Корзина" style={{ cursor: 'pointer' }} onClick={() => history.push('/cart')}>
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count" style={{ display: cartItems.length !== 0 ? 'block' : 'none' }}>
            {

              cartItems.length

            }
          </span>
        </a>
      </div>
    </header>
  );
}

export default Header;
