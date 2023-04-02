enum GuitarName {
  Electric = 'electric',
  Ukulele = 'ukulele',
  Acoustic = 'acoustic',
}

const EMPTY_GUITAR = { id: 0, name: '', vendorCode: '', type: '', description: '', previewImg: '', stringCount: 0, rating: 0, price: 0 };

export {
  GuitarName,
  EMPTY_GUITAR
};
