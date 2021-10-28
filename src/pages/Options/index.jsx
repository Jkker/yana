import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'

import Options from './Options'
import './index.css'

render(
  <ChakraProvider>
    <Options title={'settings'} />
  </ChakraProvider>,
  window.document.querySelector('#app-container')
)

if (module.hot) module.hot.accept();
