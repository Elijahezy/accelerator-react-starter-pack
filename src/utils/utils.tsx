import { GuitarName } from '../components/consts/consts';
import { Guitar } from '../types/shop-types';
import { FilterState } from '../types/state';

const translateNameOfGuitar = (type: string | undefined) => {
  switch (type) {
    case GuitarName.Electric: {
      return 'Электрогитара';
    }
    case GuitarName.Acoustic: {
      return 'Акустическая';
    }
    case GuitarName.Ukulele: {
      return 'Укулеле';
    }
    default: {
      return '';
    }
  }
};

const sortByPrice = (guitars: Guitar[], isSortedFromHighToLow: boolean, isSortedFromLowToHigh: boolean) => {
  if (isSortedFromHighToLow) {
    return guitars.sort((a: Guitar, b: Guitar) => b.price - a.price);
  }
  if (isSortedFromLowToHigh) {
    return guitars.sort((a: Guitar, b: Guitar) => a.price - b.price);
  }
  return guitars.sort((a: Guitar, b: Guitar) => b.price - a.price);
};


const sortByRating = (guitars: Guitar[], isSortedFromHighToLow: boolean, isSortedFromLowToHigh: boolean) => {
  if (isSortedFromHighToLow) {
    return guitars.sort((a: Guitar, b: Guitar) => b.rating - a.rating);
  }

  if (isSortedFromLowToHigh) {
    return guitars.sort((a: Guitar, b: Guitar) => a.rating - b.rating);
  }
  return guitars.sort((a: Guitar, b: Guitar) => b.rating - a.rating);
};

const getObjectFromQueryString = (search: string) => {
  const paramsEntries = new URLSearchParams(search).entries();


  return Object.fromEntries(paramsEntries);
};

const getQueryStringFromObject = (filter: any) => new URLSearchParams(filter).toString();


const getGuitarsMinPrice = (guitars: Guitar[]) => guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[0];
const getGuitarsMaxPrice = (guitars: Guitar[]) => guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[guitars.length - 1];

const getCurrentGuitarsMinPrice = (guitars: Guitar[], filter: FilterState) => {
  if (filter.type.length !== 0) {
    return guitars.filter((guitar) => filter.type.includes(guitar.type)).map((guitar) => guitar.price).sort((a, b) => a - b)[0];

  }
  return guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[0];

};

const getCurrentGuitarsMaxPrice = (guitars: Guitar[], filter: FilterState) => {
  if (filter.type.length !== 0) {
    const filteredGuitars = guitars.filter((guitar) => filter.type.includes(guitar.type));
    return filteredGuitars.map((guitar) => guitar.price).sort((a, b) => a - b)[filteredGuitars.length - 1];

  }
  return guitars.map((guitar) => guitar.price).sort((a, b) => a - b)[guitars.length - 1];

};

export {
  getQueryStringFromObject,
  getObjectFromQueryString,
  translateNameOfGuitar,
  sortByPrice,
  sortByRating,
  getGuitarsMinPrice,
  getGuitarsMaxPrice,
  getCurrentGuitarsMinPrice,
  getCurrentGuitarsMaxPrice
};
