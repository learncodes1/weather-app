import React, { useEffect, useReducer } from 'react';
import {
  Box,
  ChakraProvider,
  Flex,
  Spacer,
  theme,

} from '@chakra-ui/react';
import InputWrapper from './components/InputWrapper';
import "./assets/style.css"
import Header from './components/Header';
import WeatherCard from './components/weatherCard';
function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box pt="72px">
        <Header />
        <InputWrapper />
        <Flex p="15px" columnGap={15}>
          <WeatherCard />
          <Spacer />
          <Flex>
            <WeatherCard />
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
