type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
}

type Comment = {
  id: string,
  userName: string,
  advantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
  disadvantage: string,
}

type CommentPost = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}

type Coupon = {
  coupon: string,
}

type Order = {
  coupon: string | null,
  guitarsIds: number[],

}

export type {
  Guitar,
  Comment,
  CommentPost,
  Coupon,
  Order
};
