import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { ApiRoute } from '../../components/consts/api';
import { ThunkActionResult } from '../../types/actions';
import { Comment, CommentPost, Coupon, Guitar, Order } from '../../types/shop-types';
import { addDiscount, updateGuitars, uploadComments, uploadGuitars } from '../actions';

const DATA_LOAD_FAIL_MESSAGE = `Couldn't upload the data. Try again`;

const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Guitar[]>(ApiRoute.Guitars);
      dispatch(uploadGuitars(data));
      dispatch(updateGuitars(data));
    } catch {
      toast.info(DATA_LOAD_FAIL_MESSAGE);

    }
  };

const fetchGuitarCommentsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Comment[]>(ApiRoute.Comments);
    dispatch(uploadComments(data));
  };

const postComment = (props: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post<CommentPost>(ApiRoute.Comments, props);
    dispatch(fetchGuitarCommentsAction());
  };

const postCoupon = ({ coupon }: Coupon, setIsCouponValid: Dispatch<SetStateAction<number>>): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post<number>(ApiRoute.Coupons, { coupon })
      .then((response) => {
        dispatch(addDiscount(response.data));

        setIsCouponValid(1);
      })
      .catch(() => setIsCouponValid(2));
  };

const postOrder = ({ coupon, guitarsIds }: Order): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post(ApiRoute.Orders, { coupon, guitarsIds });
  };

export {
  fetchGuitarsAction,
  fetchGuitarCommentsAction,
  postComment,
  postCoupon,
  postOrder
};

