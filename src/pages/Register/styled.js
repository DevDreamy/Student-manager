/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;

    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;

    &:focus {
      border-color: ${colors.primaryColor};
    }
  }

  p.alert-hidden {
    color: ${colors.primaryColor};
    font-size: 2px;
    font-weight: 400;
    margin-top: 6px;
    padding-bottom: 0;
    display: none;
  }

  p.alert-show {
    display: block;
    color: ${colors.primaryColor};
    font-size: 2px;
    font-weight: 400;
    margin-top: 6px;
    padding-bottom: 0;
  }
`;

export const Err = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`;
