import styled from 'styled-components';

export const Item = styled.li`
  margin: 0 0 10px 0;
`;

export const Number = styled.span`
  margin-left: 5px;
  font-style: italic;
`;

export const Button = styled.button`
  display: inline-block;
  margin-left: 20px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  vertical-align: text-bottom;
  font-family: inherit;
  background-color: #c1baba;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;
