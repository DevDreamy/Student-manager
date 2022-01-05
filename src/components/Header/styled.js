/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  position: relative;

  a {
    color: #fff;
    font-weight: bold;
  }

  ul {
    display: flex;
    height: 45px;
    width: 250px;
  }

  ul li {
    position: relative;
    list-style: none;
    width: 80px;
    height: 100px;
    z-index: 1;
  }

  ul li a {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    font-weight: bold;
  }

  ul li a .icon {
    position: relative;
    display: block;
    line-height: 35px;
    font-size: 1.5em;
    text-align: center;
    transition: 0.5s;
  }

  ul li a {
    transition: 0.5s;
  }

  ul li a:hover {
    filter: brightness(85%);
  }

  ul li.active a .icon {
    transform: translateY(20px);
  }

  ul li a .text {
    letter-spacing: 0.05em;
    opacity: 1;
    transition: 0.5s;
  }

  ul li.active a .text {
    transform: translateY(4px);
    opacity: 1;
  }

  .indicator {
    position: absolute;
    top: 54%;
    margin-left: 10px;
    width: 60px;
    height: 60px;
    background: ${primaryColor};
    border-radius: 50%;
    border: 6px solid ${primaryDarkColor};
    transition: 0.5s;
  }

  .indicator::before {
    content: '';
    position: absolute;
    top: 17%;
    left: -22px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-bottom-right-radius: 20px;
    box-shadow: 0px 10px 0px 0px ${primaryDarkColor};
  }

  .indicator::after {
    content: '';
    position: absolute;
    top: 17%;
    right: -22px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-bottom-left-radius: 20px;
    box-shadow: 0px 10px 0px 0px ${primaryDarkColor};
  }

  ul li:nth-child(1).active ~ .indicator {
    transform: translateX(calc(80px * 0));
  }

  ul li:nth-child(2).active ~ .indicator {
    transform: translateX(calc(80px * 1));
  }

  ul li:nth-child(3).active ~ .indicator {
    transform: translateX(calc(80px * 2));
  }

  /* STATUS */

  @media all and (min-width: 0px) and (max-width: 320px) {
    .status {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
    }

    p {
      display: none;
    }
  }

  @media all and (min-width: 321px) and (max-width: 420px) {
    p {
      display: none;
    }
  }

  .status {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
  }

  p {
    color: #fff;
    margin: 20px 5px 20px 10px;
    font-weight: bold;
    font-size: 10px;
  }
`;
