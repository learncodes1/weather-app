import React from 'react';
import {
  Box,
  ChakraProvider,
  theme,

} from '@chakra-ui/react';
import InputWrapper from './components/InputWrapper';
import "./assets/style.css"
import './assets/card.css';
import Header from './components/Header';
 function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box pt="72px">
        <Header />
        <InputWrapper />
      </Box>
    </ChakraProvider>
  );
}

export default App;
