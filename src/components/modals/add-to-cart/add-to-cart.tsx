import FocusTrap from 'focus-trap-react';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addGuitarToCart } from '../../../store/actions';
import { Guitar } from '../../../types/shop-types';

type AddToCartProps = {
  guitarToAddToCart: Guitar,
  onSetIsAddToCartModal: Dispatch<SetStateAction<boolean>>,
  onSetIsAddToCartSuccessModal: Dispatch<SetStateAction<boolean>>,
}

function AddToCart({ guitarToAddToCart, onSetIsAddToCartModal, onSetIsAddToCartSuccessModal }: AddToCartProps) {

  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const handleAddTocart = () => {
    dispatch(addGuitarToCart(guitarToAddToCart));
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
        onSetIsAddToCartModal(false);
      }
    };
    document.addEventListener('keydown', handleCloseModalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleCloseModalKeyDown);
    };

  }, [onSetIsAddToCartModal]);


  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (event.target === modalRef.current) {
        onSetIsAddToCartModal(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);

  }, [onSetIsAddToCartModal]);

  return (
    <FocusTrap >
      <div style={{ position: 'relative', width: '550px', height: '440px', marginBottom: '50px' }}>
        <div className="modal is-active modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal ref={modalRef}></div>
            <div className="modal__content">
              <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
              <div className="modal__info"><img className="modal__img" src={`/${guitarToAddToCart?.previewImg}`} width="67" height="137" alt="Честер bass" />
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitarToAddToCart?.name}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitarToAddToCart?.vendorCode}</p>
                  <p className="modal__product-params">{guitarToAddToCart?.type}, {guitarToAddToCart?.stringCount} струнная</p>
                  <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitarToAddToCart?.price.toLocaleString()} ₽</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--red button--big modal__button modal__button--add" onClick={() => {
                  handleAddTocart();
                  onSetIsAddToCartModal(false);
                  onSetIsAddToCartSuccessModal(true);
                }}
                >
                  Добавить в корзину
                </button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onSetIsAddToCartModal(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default AddToCart;
