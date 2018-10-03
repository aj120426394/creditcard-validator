import { css } from 'styled-components';


// Prop passing Shorthands for Styled-components


// Border
export const borderProps = (props) => css`
  ${props.borderBottom && `border-bottom: ${props.borderWidth || '1px'} solid ${props.borderColor || '#333'}`};
  ${props.borderTop && `border-top: ${props.borderWidth || '1px'} solid ${props.borderColor || '#333'}`};
  ${props.borderLeft && `border-left: ${props.borderWidth || '1px'} solid ${props.borderColor || '#333'}`};
  ${props.borderRight && `border-right: ${props.borderWidth || '1px'} solid ${props.borderColor || '#333'}`};
`;


// Margin
export const marginProps = (props) => css`
  ${props.marginBottom && `margin-bottom: ${typeof props.marginBottom === 'string' ? props.marginBottom : '1em'}`};
  ${props.marginTop && `margin-top: ${typeof props.marginTop === 'string' ? props.marginTop : '1em'}`};
  ${props.marginLeft && `margin-left: ${typeof props.marginLeft === 'string' ? props.marginLeft : '1em'}`};
  ${props.marginRight && `margin-right: ${typeof props.marginRight === 'string' ? props.marginRight : '1em'}`};
  ${props.margin && `margin: ${typeof props.margin === 'string' ? props.margin : '1em'}`};
  ${props.marginVertical &&
    `
 margin-top: ${typeof props.marginVertical === 'string' ? props.marginVertical : '1em'}
 margin-bottom: ${typeof props.marginVertical === 'string' ? props.marginVertical : '1em'}
 `};
  ${props.marginHorizontal &&
    `
 margin-left: ${typeof props.marginHorizontal === 'string' ? props.marginHorizontal : '1em'}
 margin-right: ${typeof props.marginHorizontal === 'string' ? props.marginHorizontal : '1em'}
 `};
`;


// Padding
export const paddingProps = (props) => css`
  ${props.paddingBottom && `padding-bottom: ${typeof props.paddingBottom === 'string' ? props.paddingBottom : '1em'}`};
  ${props.paddingTop && `padding-top: ${typeof props.paddingTop === 'string' ? props.paddingTop : '1em'}`};
  ${props.paddingLeft && `padding-left: ${typeof props.paddingLeft === 'string' ? props.paddingLeft : '1em'}`};
  ${props.paddingRight && `padding-right: ${typeof props.paddingRight === 'string' ? props.paddingRight : '1em'}`};
  ${props.padding && `padding: ${typeof props.padding === 'string' ? props.padding : '1em'}`};
  ${props.paddingVertical &&
    `
 padding-top: ${typeof props.paddingVertical === 'string' ? props.paddingVertical : '1em'}
 padding-bottom: ${typeof props.paddingVertical === 'string' ? props.paddingVertical : '1em'}
 `};
  ${props.paddingHorizontal &&
    `
 padding-left: ${typeof props.paddingHorizontal === 'string' ? props.paddingHorizontal : '1em'}
 padding-right: ${typeof props.paddingHorizontal === 'string' ? props.paddingHorizontal : '1em'}
 `};
`;
