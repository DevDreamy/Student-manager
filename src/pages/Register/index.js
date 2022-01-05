/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import { Form, Err } from './styled';
import * as actions from '../../store/modules/auth/actions';

// Register Page
// Unlike some of the other pages, this one will work as two at the same time,
// working both to register new users and to edit a user who is already logged in.
// Redux saga will do all the work of checking if there is an user logged in,
// if so, then their information will be updated. A new user will be created if there's no user logged in.

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nameStored = useSelector((state) => state.auth.user.name);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setName(nameStored);
    setEmail(emailStored);
  }, [id, nameStored, emailStored]);

  // This handleSubmit checks each form field before dispatching a register request.
  // Each field shows an error message if the information submited isn't valid.
  // I found that multiple error messages popping up on the screen made it look ugly,
  // so the solution I found was to create an array that will receive each error message,
  // showing at the end only one notification with all the errors at once.

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;
    const msgErr = [];

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      msgErr.push('Nome deve ter entre 3 e 255 caracteres.');
    }

    if (!isEmail(email)) {
      formErrors = true;
      msgErr.push('E-mail inválido.');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      msgErr.push('Senha deve ter entre 6 e 50 caracteres.');
    }
    if (msgErr.length > 0) {
      const allErr = msgErr.map((msg) => {
        return <Err>{msg}</Err>;
      });
      toast.error(<div>{allErr}</div>);
      toast.clearWaitingQueue();
    }

    if (formErrors) return;
    dispatch(actions.registerRequest({ id, name, email, password }));
  }

  // These simple handleFormInfo will show and hide an alert text next to the input,
  // alerting that when changing the e-mail, the user will be logged out.

  const handleFormInfo = (e) => {
    const info = e.currentTarget.nextSibling;
    info.setAttribute('class', 'alert-show');
  };
  const handleFormInfoOff = (e) => {
    const info = e.currentTarget.nextSibling;
    info.setAttribute('class', 'alert-hidden');
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Dados' : 'Crie sua conta'}</h1>
      <span className="warn">
        Este site é fictícional, não use dados reais.
      </span>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          {id ? (
            <input
              onFocus={handleFormInfo}
              onBlur={handleFormInfoOff}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
            />
          ) : (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
            />
          )}
          {id && (
            <p className="alert-hidden" display="none">
              *Ao alterar o e-mail você precisará logar novamente.
            </p>
          )}
        </label>
        <label htmlFor="name">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <button type="submit">{id ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}
