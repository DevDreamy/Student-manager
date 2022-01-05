/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StudentContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }
  div + div span {
    display: table-cell;
    vertical-align: middle;
    text-align: start;
    width: 100%;
  }
  a:first-of-type {
    margin-right: 15px;
  }

  a {
    transition: all 300ms;
  }

  a:hover {
    filter: brightness(70%);
  }

  .dev {
    position: relative;
    left: 25%;
    color: #aaa;
    font-size: 12px;
    text-decoration: none;
  }

  .header {
    justify-content: center;
  }

  .header span {
    font-weight: bold;
    margin-left: 29px;
    margin-right: 59px;
    margin-bottom: -10px;
  }

  @media all and (min-width: 0px) and (max-width: 320px) {
    .lastname {
      display: none;
    }
    .header span {
      margin-right: 40%;
    }
  }

  @media all and (min-width: 321px) and (max-width: 480px) {
    .lastname {
      display: none;
    }
    .header span {
      margin-right: 40%;
    }
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
`;

export const NewStudent = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

export const MsgErrorContainer = styled.div`
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

  div {
    background-color: white;
    width: 400px;
    height: 200px;
    z-index: 2;
    margin-top: 55px;
    position: absolute;
    border-radius: 10px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    font-weight: bold;
  }

  button {
    margin-top: 40px;
    margin-left: 65px;
  }
`;
