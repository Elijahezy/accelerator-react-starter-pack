import FocusTrap from 'focus-trap-react';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGuitarFromCart } from '../../../store/actions';
import { Guitar } from '../../../types/shop-types';
import { translateNameOfGuitar } from '../../../utils/utils';

type DeleteCartProps = {
  guitar: Guitar,
  onSetIsDeleteCartItem: Dispatch<SetStateAction<boolean>>,
}

function DeleteCart({ guitar, onSetIsDeleteCartItem }: DeleteCartProps) {
  const dispatch = useDispatch();

  const modalRef = useRef(null);

  const handleDeleteFromCart = () => {
    dispatch(deleteGuitarFromCart(guitar));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {

    const handleCloseModalKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onSetIsDeleteCartItem(false);
      }
    };
    document.addEventListener('keydown', handleCloseModalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleCloseModalKeyDown);
    };

  }, [onSetIsDeleteCartItem]);

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (event.target === modalRef.current) {
        onSetIsDeleteCartItem(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);

  }, [onSetIsDeleteCartItem]);
  return (
    <FocusTrap >
      <div style={{ position: 'relative', width: '550px', height: '0px', marginBottom: '0px' }}>
        <div className="modal is-active modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal ref={modalRef}></div>
            <div className="modal__content">
              <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
              <div className="modal__info"><img className="modal__img" src={`/${guitar.previewImg}`} width="67" height="137" alt="Честер bass" />
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
                  <p className="modal__product-params">{translateNameOfGuitar(guitar.type)}, {guitar.stringCount} струнная</p>
                  <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar.price.toLocaleString()} ₽</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--small modal__button" onClick={() => handleDeleteFromCart()}>Удалить товар</button>
                <button className="button button--black-border button--small modal__button modal__button--right" onClick={() => onSetIsDeleteCartItem(false)}>Продолжить покупки</button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onSetIsDeleteCartItem(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default DeleteCart;

