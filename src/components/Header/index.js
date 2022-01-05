/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React, { useRef } from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaRegUserCircle,
  FaPowerOff,
  FaList,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav } from './styled';

// Unlike the original project that had a simple menu,
// this component implements a menu with better visual effects.

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id, name } = useSelector((state) => state.auth.user);

  // The handleLogout dispatches the action loginFailure to logout the user.

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/login');
  };

  // The next 3 handleClicks are controlling the nav effect.
  // They remove the "active" class from the elements that already had it and then,
  //  put the "active" class in the element that the user clicked.

  const handleClick = (e) => {
    const activeLink = e.currentTarget;

    const elements = document.querySelectorAll('.active');
    if (elements[1]) {
      elements[1].classList.remove('active');
    }
    if (elements[2]) {
      elements[2].classList.remove('active');
    }
    elements[0].classList.toggle('active');
    activeLink.setAttribute('class', 'active');
  };

  const handleClick2 = (e) => {
    const elements = document.querySelectorAll('.active');

    if (elements[0]) {
      elements[0].classList.remove('active');
    }
    if (elements[2]) {
      elements[2].classList.remove('active');
    }
    const activeLink = e.currentTarget;
    activeLink.setAttribute('class', 'active');
  };

  const handleClick3 = (e) => {
    const elements = document.querySelectorAll('.active');
    if (elements[1]) {
      elements[1].classList.remove('active');
    }
    if (elements[0]) {
      elements[0].classList.remove('active');
    }
    const activeLink = e.currentTarget;
    activeLink.setAttribute('class', 'active');
  };

  return (
    <Nav>
      <ul>
        <li className="list active" onClickCapture={handleClick}>
          <Link to="/">
            <span className="text">Home</span>
            <span className="icon">
              <FaHome size={28} />
            </span>
          </Link>
        </li>
        <li className="list" onClickCapture={handleClick2}>
          <Link to="/register">
            {isLoggedIn ? (
              <span className="text">Editar</span>
            ) : (
              <span className="text">Cadastrar</span>
            )}
            <span className="icon">
              <FaUserAlt size={24} />
            </span>
          </Link>
        </li>

        <li className="list" onClickCapture={handleClick3}>
          {isLoggedIn ? (
            <Link onClick={handleLogout} to="/logout">
              <span className="text">Logoff</span>
              <span className="icon">
                <FaPowerOff size={24} />
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <span className="text">Login</span>
              <span className="icon">
                <FaSignInAlt size={24} />
              </span>
            </Link>
          )}
        </li>
        <div className="indicator" />
      </ul>

      <div className="status">
        {id ? <p>Olá, {name}</p> : <p>Desconectado</p>}

        {isLoggedIn ? (
          <FaRegUserCircle size={24} color="#00c300" />
        ) : (
          <FaRegUserCircle size={24} color="black" />
        )}
      </div>
    </Nav>
  );
}
