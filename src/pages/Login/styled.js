/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 5px;

    &:focus {
      border-color: ${colors.primaryColor};
    }
  }
`;
