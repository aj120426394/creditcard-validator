import { css } from 'styled-components';

export const zIndex0 = css`
  position: absolute;
  z-index: 0;
`;

export const zIndex1 = css`
  position: absolute;
  z-index: 1;
`;

export const zIndex2 = css`
  position: absolute;
  z-index: 2;
`;

export const zIndex3 = css`
  position: absolute;
  z-index: 3;
`;

export const zIndex4 = css`
  position: absolute;
  z-index: 4;
`;

export const zIndex5 = css`
  position: absolute;
  z-index: 5;
`;

export const zIndex = css`
  z-index: ${(props) => {
    switch (props.zIndex) {
      case 1:
        return 1;

      case 2:
        return 2;

      case 3:
        return 3;

      case 4:
        return 4;

      case 5:
        return 5;
    }
  }};
`;
