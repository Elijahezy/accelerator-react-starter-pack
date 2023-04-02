import { Guitar } from '../types/shop-types';
import { commerce, datatype, image, lorem } from 'faker';

export const makeFakeGuitar = (): Guitar => ({
  id: parseFloat(datatype.uuid()),
  name: commerce.productName(),
  vendorCode: lorem.word(),
  type: commerce.productAdjective(),
  description: commerce.productDescription(),
  previewImg: image.image(),
  stringCount: datatype.number(),
  price: parseFloat(commerce.price()),
  rating: datatype.number(),
});
