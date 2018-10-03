// @flow
import { css } from 'styled-components';

export const zDepth1 = css`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.22), 0 3px 1px -2px rgba(0, 0, 0, 0.3);
`;
export const zDepth2 = css`
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.24), 0 1px 10px 0 rgba(0, 0, 0, 0.22), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
`;
export const zDepth3 = css`
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.24), 0 1px 18px 0 rgba(0, 0, 0, 0.22), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
`;
export const zDepth4 = css`
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.24), 0 3px 14px 2px rgba(0, 0, 0, 0.22), 0 5px 5px -3px rgba(0, 0, 0, 0.4);
`;
export const zDepth5 = css`
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.24), 0 6px 30px 5px rgba(0, 0, 0, 0.22),
    0 8px 10px -5px rgba(0, 0, 0, 0.4);
`;


type Props = {
  zDepth?: number
}
export const shadow = css`
  box-shadow: ${(props: Props): string => {
    switch (props.zDepth) {
      case 1:
        return '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.22), 0 3px 1px -2px rgba(0, 0, 0, 0.3)';
      case 2:
        return '0 4px 5px 0 rgba(0, 0, 0, 0.24), 0 1px 10px 0 rgba(0, 0, 0, 0.22), 0 2px 4px -1px rgba(0, 0, 0, 0.4)';
      case 3:
        return '0 6px 10px 0 rgba(0, 0, 0, 0.24), 0 1px 18px 0 rgba(0, 0, 0, 0.22), 0 3px 5px -1px rgba(0, 0, 0, 0.4)';
      case 4:
        return '0 8px 10px 1px rgba(0, 0, 0, 0.24), 0 3px 14px 2px rgba(0, 0, 0, 0.22), 0 5px 5px -3px rgba(0, 0, 0, 0.4)';
      case 5:
        return '0 16px 24px 2px rgba(0, 0, 0, 0.24), 0 6px 30px 5px rgba(0, 0, 0, 0.22), 0 8px 10px -5px rgba(0, 0, 0, 0.4)';
      default:
        return '0 4px 5px 0 rgba(0, 0, 0, 0.24), 0 1px 10px 0 rgba(0, 0, 0, 0.22), 0 2px 4px -1px rgba(0, 0, 0, 0.4)';
    }
  }};
`;
