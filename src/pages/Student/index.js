/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, Err, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

// Student Page
// This page shows all the information of a single student, allowing the user to edit them.
// If the student does not exist, so a new student will be registered.

export default function Student({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        // eslint-disable-next-line no-unused-vars
        const Photo = get(data, 'Photos[0].url', '');

        setPhoto(Photo);

        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history.push('/');
        }
      }
    }

    getData();
  }, [id]);

  // This handleSubmit will verify if all information sent are valid,
  // If so it will check if this information was sent to an ID that already exists,
  // if there is an existing ID, the information sent will be used to update a student profile,
  // otherwise a new student will be registered.

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;
    const msgErr = [];
    if (name.length < 3 || name.length > 15) {
      msgErr.push('Nome precisa ter entre 3 e 15 caracteres.');
      formErrors = true;
    }
    if (lastname.length < 3 || lastname.length > 15) {
      msgErr.push('Sobrenome precisa ter entre 3 e 15 caracteres.');
      formErrors = true;
    }
    if (!isEmail(email)) {
      msgErr.push('E-mail inválido.');
      formErrors = true;
    }
    if (!isInt(String(age))) {
      msgErr.push('Idade inválida.');
      formErrors = true;
    }
    if (!isFloat(String(weight))) {
      msgErr.push('Peso inválido.');
      formErrors = true;
    }
    if (!isFloat(String(height))) {
      msgErr.push('Altura inválida.');
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
    }

    if (msgErr.length > 0) {
      const allErr = msgErr.map((msg) => {
        return <Err>{msg}</Err>;
      });
      toast.error(<div>{allErr}</div>);
      toast.clearWaitingQueue();
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        // Editing
        await axios.put(`/students/${id}`, {
          name,
          lastname,
          email,
          age,
          weight,
          height,
        });
        toast.success('Aluno(a) editado(a) com sucesso.');
      } else {
        // Creating
        const { data } = await axios.post(`/students/`, {
          name,
          lastname,
          email,
          age,
          weight,
          height,
        });
        toast.success('Aluno(a) criado(a) com sucesso.');
        history.push(`/student/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido.');
      }
      if (status === 401) {
        dispatch(actions.loginFailure);
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar aluno' : 'Novo Aluno'}</Title>
      <span className="warn">
        Este site é fictícional, não use dados reais.
      </span>
      {id && (
        <ProfilePicture>
          {photo ? <img src={photo} alt={name} /> : <FaUserCircle size={180} />}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        {id ? 'Nome:' : ''}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
        {id ? 'Sobrenome:' : ''}
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Sobrenome"
        />
        {id ? 'E-mail:' : ''}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {id ? 'Idade:' : ''}
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Idade"
        />
        {id ? 'Peso:' : ''}
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Peso"
        />
        {id ? 'Altura:' : ''}
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Altura"
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Student.protoTypes = {
  match: PropTypes.shape({}).isRequired,
};
