import FocusTrap from 'focus-trap-react';
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postComment } from '../../../store/api-actions/api-actions';
import { Guitar } from '../../../types/shop-types';
import { State } from '../../../types/state';
import { checkNameValidity } from '../../../utils/validation';

type NewReviewProps = {
  onSetIsReviewModal: Dispatch<SetStateAction<boolean>>,
  onSetIsCongratsModal: Dispatch<SetStateAction<boolean>>
}

function NewReview({ onSetIsReviewModal, onSetIsCongratsModal }: NewReviewProps) {

  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const product = guitars.find((guitar) => guitar.id === parseFloat(id));
  const [name, setName] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [advantage, setAdvantage] = useState<string>('');
  const [disadvantage, setDisadvantage] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isNameFilled, setIsNameFilled] = useState<boolean>(true);
  const [isRatingFilled, setIsRatingFilled] = useState<boolean>(true);
  const [isAdvantageFilled, setIsAdvantageFilled] = useState<boolean>(true);
  const [isDisadvantageFilled, setIsDisadvantageFilled] = useState<boolean>(true);
  const [isCommentFilled, setIsCommentFilled] = useState<boolean>(true);
  const reviewRef = useRef(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (name === '' || rating === '' || advantage === '' || advantage === '' || disadvantage === '' || comment === '') {
      name === '' ? setIsNameFilled(false) : setIsNameFilled(true);
      rating === '' ? setIsRatingFilled(false) : setIsRatingFilled(true);
      advantage === '' ? setIsAdvantageFilled(false) : setIsAdvantageFilled(true);
      disadvantage === '' ? setIsDisadvantageFilled(false) : setIsDisadvantageFilled(true);
      comment === '' ? setIsCommentFilled(false) : setIsCommentFilled(true);
      return;
    }

    setIsRatingFilled(true);
    setIsNameFilled(true);
    onSetIsReviewModal(false);
    onSetIsCongratsModal(true);
    dispatch(postComment({ userName: name, guitarId: parseFloat(id), advantage: advantage, disadvantage: disadvantage, comment: comment, rating: parseFloat(rating) }));
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
        onSetIsReviewModal(false);
      }
    };
    document.addEventListener('keydown', handleCloseModalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleCloseModalKeyDown);
    };

  }, [onSetIsReviewModal]);

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (event.target === reviewRef.current) {
        onSetIsReviewModal(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);

  }, [onSetIsReviewModal]);


  return (
    <FocusTrap >
      <div style={{ position: 'relative', width: '550px', height: '610px', marginBottom: '50px' }} >
        <div className="modal is-active modal--review modal-for-ui-kit" >
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal ref={reviewRef}></div>
            <div className="modal__content">
              <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
              <h3 className="modal__product-name title title--medium-20 title--uppercase">{product?.name}</h3>
              <form className="form-review" onSubmit={(evt) => handleSubmit(evt)}>
                <div className="form-review__wrapper">
                  <div className="form-review__name-wrapper">
                    <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                    <input
                      className="form-review__input form-review__input--name"
                      id="user-name"
                      type="text" autoComplete="off"
                      onInput={(evt) => {
                        setName(evt.currentTarget.value);
                        checkNameValidity(evt);
                      }}
                      maxLength={30}
                    />{isNameFilled ? '' : <span className="form-review__warning" >Заполните поле</span>}
                  </div>
                  <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                    <div className="rate rate--reverse">
                      <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" onChange={(evt) => setRating(evt.currentTarget.value)} />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" onChange={(evt) => setRating(evt.currentTarget.value)} />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" onChange={(evt) => setRating(evt.currentTarget.value)} />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" onChange={(evt) => setRating(evt.currentTarget.value)} />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" onChange={(evt) => setRating(evt.currentTarget.value)} />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label><span className="rate__count"></span>{isRatingFilled ? '' : <span className="rate__message">Поставьте оценку</span>}
                    </div>
                  </div>
                </div>
                <label className="form-review__label" htmlFor="user-name">Достоинства</label>
                <input className="form-review__input" id="pros" type="text" autoComplete="off" onInput={(evt) => setAdvantage(evt.currentTarget.value)} maxLength={120} />
                {isAdvantageFilled ? '' : <span className="form-review__warning" >Заполните поле</span>}
                <label className="form-review__label" htmlFor="user-name">Недостатки</label>
                <input className="form-review__input" id="user-name" type="text" autoComplete="off" onInput={(evt) => setDisadvantage(evt.currentTarget.value)} maxLength={120} />
                {isDisadvantageFilled ? '' : <span className="form-review__warning" >Заполните поле</span>}
                <label className="form-review__label" htmlFor="user-name">Комментарий</label>
                <textarea className="form-review__input form-review__input--textarea" maxLength={360} id="user-name" rows={10} autoComplete="off" onInput={(evt) => setComment(evt.currentTarget.value)}></textarea>
                {isCommentFilled ? '' : <span className="form-review__warning" >Заполните поле</span>}
                <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
              </form>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => onSetIsReviewModal(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default NewReview;
