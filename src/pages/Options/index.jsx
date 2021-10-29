import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { ClassListProvider } from '@models/ClassListContext'
import Options from './Options'
import Test from './Test'
import Popup from '../Popup/Popup'

render(
  <ChakraProvider>
    <ClassListProvider>
      {/* <Test /> */}
      <Popup />
      {/* <Options title={'Options'} /> */}
    </ClassListProvider>
  </ChakraProvider>,
  window.document.querySelector('#app-container')
)

if (module.hot) module.hot.accept();
