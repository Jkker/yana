import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Popup from './Popup';

render(
  <ChakraProvider>
    <Popup />
  </ChakraProvider>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
