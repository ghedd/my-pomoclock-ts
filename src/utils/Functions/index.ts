export const parseTimeNum = ( num: number ) => {
  return num >= 10 ? num.toString() : `0${ num.toString() }`;
};