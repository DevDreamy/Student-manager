/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import {
  StudentContainer,
  ProfilePicture,
  NewStudent,
  MsgErrorContainer,
} from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

// Students Page
// This page shows all registered students and work as the main page of the application.
// Logged in users will be able to edit and delete students.

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newIndex, setNewIndex] = useState('');

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/students');
      setStudents(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e, id, name, index) => {
    e.preventDefault();
    setIsDeleting(true);
    setNewId(id);
    setNewName(name);
    setNewIndex(index);
  };

  const handleDelete = async (e) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/students/${newId}`);
      const newStudents = [...students];
      newStudents.splice(newIndex, 1);
      setStudentName(newStudents);
      setIsLoading(false);
      setIsDeleting(false);
      toast.success(`${newName} foi excluído.`);
    } catch (err) {
      const status = get(err, 'response.status', []);

      if (status === 401) {
        toast.error('Você precisa fazer login.');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno.');
      }
      setIsLoading(false);
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setIsDeleting(false);
  };

  return (
    <Container>
      {isDeleting && (
        <MsgErrorContainer>
          {students.map((student, index) => (
            <div>
              <span>Você confirma a exclusão do aluno: {newName}?</span>
              <button
                type="submit"
                onClick={(e) => handleDelete(e)}
                className="confirm"
              >
                Confirmar
              </button>
              <button type="submit" onClick={handleCancel} className="cancel">
                Cancelar
              </button>
            </div>
          ))}
        </MsgErrorContainer>
      )}

      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NewStudent to="/student/">
        <button type="submit">Novo Aluno</button>
      </NewStudent>

      <StudentContainer>
        <div className="header">
          <span>Nome</span>
          <span className="lastname">Sobrenome</span>
        </div>
        {students.map((student, index) => (
          <div key={String(student.id)} id={student.id}>
            <ProfilePicture>
              {get(student, 'Photos[0].url', false) ? (
                <img src={student.Photos[0].url} alt="" />
              ) : (
                <FaUserCircle size={45} />
              )}
            </ProfilePicture>
            <span>{student.name}</span>
            <span className="lastname">{student.lastname}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link
              onClick={(e) =>
                handleDeleteAsk(e, student.id, student.name, index)
              }
              to={`/student/${student.id}/delete`}
            >
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
        <a className="dev" href="https://github.com/DevDreamy">
          Desenvolvido por: Leonardo Rocha.
        </a>
      </StudentContainer>
    </Container>
  );
}
