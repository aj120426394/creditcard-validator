import styled from 'styled-components';

export const InlineListLinksContainer = styled.ul`
  color: #fff;
  padding: 0;

  /* border-right: solid 1px #fff; */

  li {
    list-style: none;
    box-sizing: border-box;
    padding-right: 10px;
    display: inline-block;

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
