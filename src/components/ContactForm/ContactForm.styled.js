import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
`;

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
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  font-family: inherit;
  line-height: 1.1;
  color: black;

  &::placeholder {
    color: #010101;
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 20px;
  line-height: 1.1;
  text-align: center;
  color: black;
  background-color: #c1baba;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;
