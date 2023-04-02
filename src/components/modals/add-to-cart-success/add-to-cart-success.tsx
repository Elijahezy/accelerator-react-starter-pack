import FocusTrap from 'focus-trap-react';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

type AddToCartSuccessProps = {
  onSetIsAddToCartSuccessModal: Dispatch<SetStateAction<boolean>>
}

function AddToCartSuccess({ onSetIsAddToCartSuccessModal }: AddToCartSuccessProps) {

  const history = useHistory();

  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleCloseModalKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onSetIsAddToCartSuccessModal(false);
      }
    };
    document.addEventListener('keydown', handleCloseModalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleCloseModalKeyDown);
    };

  }, [onSetIsAddToCartSuccessModal]);

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (event.target === modalRef.current) {
        onSetIsAddToCartSuccessModal(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);

  }, [onSetIsAddToCartSuccessModal]);
  return (
    <FocusTrap >
      <div style={{ position: 'relative', width: '550px', height: '410px', marginBottom: '50px' }}>
        <div className="modal is-active modal--success modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal ref={modalRef}></div>
            <div className="modal__content">
              <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <p className="modal__message">Товар успешно добавлен в корзину</p>
              <div className="modal__button-container modal__button-container--add">
                <button className="button button--small modal__button" onClick={() => history.push('/cart')}>Перейти в корзину</button>
                <button className="button button--black-border button--small modal__button modal__button--right" onClick={() => {
                  onSetIsAddToCartSuccessModal(false);
                  history.push('/');
                }}
                >Продолжить покупки
                </button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onSetIsAddToCartSuccessModal(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default AddToCartSuccess;
