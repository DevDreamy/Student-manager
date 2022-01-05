/* eslint-disable react/function-component-definition */
import React from 'react';
import PropTypes from 'prop-types';
import { RainbowSpinner } from 'react-spinners-kit';
import { Container } from './styled';

// This is a component that shows a loading screen for the user
// I made some changes compared to the original project,
// such as putting a Rainbow Spinner instead of simple text written on the screen

export default function Loading({ isLoading }) {
  if (!isLoading) return <> </>;
  return (
    <Container>
      <span>Carregando...</span>
      <RainbowSpinner size={130} color="#ccc" />
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
