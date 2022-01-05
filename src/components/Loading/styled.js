/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);

  span {
    z-index: 2;
    margin-top: 55px;
    font-size: 14px;
    font-weight: 600;
    color: #ccc;
    position: absolute;
  }
`;
