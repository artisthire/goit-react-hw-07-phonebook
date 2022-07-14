import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  margin: 0 0 20px;
`;

export const LabelName = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: 600;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 70%;
  padding: 5px;
  border: 1px solid #ccc;
  font-family: inherit;
  line-height: 1.1;
  color: black;

  &::placeholder {
    color: #010101;
  }
`;
