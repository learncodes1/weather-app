import React from 'react';
import { Box, ChakraProvider, Flex, theme, } from '@chakra-ui/react';
import InputWrapper from './components/InputWrapper';
import "./assets/style.css"
import './assets/card.css';
import Header from './components/Header';

function App() {

  return (
    <ChakraProvider theme={theme}>

      <Flex flexDirection="column" minHeight="100vh">
        {/* Header */}
        <Box height="60px" >
          {/* Header Content */}
          <Header />
        </Box>

        <Flex flex="1" mt="13px" flexDirection={['column', 'column', 'column', 'column', 'row']}>
          <InputWrapper />

        </Flex>

      </Flex>
    </ChakraProvider>
  );
}

export default App;
