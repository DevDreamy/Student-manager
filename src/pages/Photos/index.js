/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

// Photo Page

export default function Photos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = React.useState(false);
  const [photo, setPhoto] = React.useState('');

  // Get the student's photo from the database

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const photoURL = get(data, 'Photos[0].url', '');
        setPhoto(photoURL);
        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem.');
        setIsLoading(false);
        history.push('/');
      }
    };

    getData();
  }, [id]);

  // The handleChange will try to upload the new photo to the respective student.
  // First, it will check the file extension, if the extension is valid it will send the new photo to the database.
  // One important thing to note is that the user may have more than one photo in the database,
  // but only the last photo sent will be shown as the student profile picture.

  const handleChange = async (e) => {
    // eslint-disable-next-line no-shadow

    const fileExtension = e.target.files[0].type;

    if (
      fileExtension === 'image/jpeg' ||
      fileExtension === 'image/jpg' ||
      fileExtension === 'image/png'
    ) {
      if (e.target.files.length !== 0) {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setPhoto(fileURL);

        const formData = new FormData();
        formData.append('student_id', id);
        formData.append('photo', file);

        try {
          setIsLoading(true);

          await axios.post('/photos/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          toast.success('Foto atualizada com sucesso.');

          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          const { status } = get(err, 'response', '');
          const { error } = get(err, 'response.errors', '');
          toast.error('Erro ao enviar foto.');

          if (status === 401) dispatch(actions.loginFailure());
        }
      } else {
        toast.error('Formato inválido.');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Foto</h1>

      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="photo" onChange={handleChange} />
          <input />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
