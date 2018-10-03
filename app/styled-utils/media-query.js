import {css} from 'styled-components';

export const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
};


// You can use this like ${media.phone`width: 100%`}

export default Object.keys(sizes).reduce((accumulator, label) => {
  const acc = accumulator;
  const emSize = sizes[label] / 16
  acc[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});




// export const media = {
//   handheld: (...args) => css`
//     @media (max-width: 420px) {
//       ${ css(...args) }
//     }
//   `
// };



