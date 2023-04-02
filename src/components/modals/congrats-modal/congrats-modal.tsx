import FocusTrap from 'focus-trap-react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

type CongratsModalProps = {
  onSetIsCongratsModal: Dispatch<SetStateAction<boolean>>
}

function CongratsModal({ onSetIsCongratsModal }: CongratsModalProps) {

  const congratsRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {

    const handleCloseModalKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onSetIsCongratsModal(false);
      }
    };
    document.addEventListener('keydown', handleCloseModalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleCloseModalKeyDown);
    };

  }, [onSetIsCongratsModal]);

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (event.target === congratsRef.current) {
        onSetIsCongratsModal(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);

  }, [onSetIsCongratsModal]);
  return (
    <FocusTrap >
      <div style={{ position: 'relative', width: '550px', height: '610px', marginBottom: '50px' }} >
        <div className="modal is-active modal--success modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal ref={congratsRef}></div>
            <div className="modal__content" >
              <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <p className="modal__message">Спасибо за ваш отзыв!</p>
              <div className="modal__button-container modal__button-container--review">
                <button className="button button--small modal__button modal__button--review" onClick={() => onSetIsCongratsModal(false)}>К покупкам!</button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onSetIsCongratsModal(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default CongratsModal;
