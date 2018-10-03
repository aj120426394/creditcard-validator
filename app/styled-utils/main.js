import styled from 'styled-components';

// import {
//   borderProps,
//   marginProps,
//   backgroundColorProps,
//   paddingProps,
//   alignmentProps,
//   positioningProps,
//   sizeProps,
//   spacingProps,
//   theme
// } from 'ui';

// const { screenSizes } = theme;

export const overlay = `
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 background: rgba(0,0,0,0.5); 
`;



// Positioning

export const Relative = styled.div`
  ${(props) => borderProps(props)};
  position: relative;
`;

export const Absolute = styled.div`
  ${(props) => marginProps(props)};
  ${(props) => alignmentProps(props)};
  ${(props) => borderProps(props)};
  position: absolute;
  ${(props) => props.right && `right: ${props.padded ? '1em' : '0'}; `} ${(props) =>
  props.left && `left: ${props.padded ? '1em' : '0'}`};
  ${(props) => props.top && `top: ${props.padded ? '1em' : '0'}`};
  ${(props) => props.bottom && `bottom: ${props.padded ? '1em' : '0'}`};
`;

// Patterns
export const Collapsable = styled.section`
  opacity: 1;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.animate &&
    `
 transition: 
 transform 300ms linear,
 opacity 300ms ease-in,
 width 200ms ease-in,
 max-height 200ms ease-in 200ms;
 max-height: 9999px;
 transform: scale(1);
 transform-origin: 100% 100%;
 ${props.collapsed &&
   `
 transform: scale(0);
 transition: 
 transform 300ms ease-out,
 opacity 300ms ease-out,
 width 300ms ease-out 600ms;
 `}
 `} ${(props) =>
  props.collapsed &&
    `
 opacity: 0;
 max-height: 0;
 `};
`;

export const Ellipsis = styled.div`
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : '100%')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// export const Circle = styled.span`
//   ${backgroundColorProps} display: inline-block;
//   border-radius: 50%;
//   padding: ${(props) => props.padding || '10px'};
// `;

export const Hidden = styled.div`
  display: none;
`;
