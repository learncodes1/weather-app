import { Box, Flex, Heading, Image, Input, InputGroup, ListItem, Skeleton, Stack, Text, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { weatherSearchApi } from '../utils/api'
import debounce from '../utils/debounce';
import WeatherCard from "./weatherCard";

const useSearchData = () => {
  const [searchData, setSearchData] = useState([])
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [value, setValue] = useState({ lat: '', lng: '', name: '' })
 
  const debouncedFetchData = debounce(fetchData, 300);

  const handleFetchData = async (e) => {
    setActive(true)
    setValue(prevValue => ({ ...prevValue, name: e.target.value }))
    if (e.target.value !== '') {
      debouncedFetchData(e.target.value)
    } else {
      setActive(false)
    }
  }

  async function fetchData(searchTerm) {
    setLoading(true)
    try {
      const results = await weatherSearchApi(searchTerm)
      setSearchData(results)
      setLoading(false)
    } catch (error) {
      setError("No Data Found")
    }
  }

  const handleClick = (lat, lng, name) => {
    setValue({ ...value, lat, lng, name })
    setActive(false)
  }

  useEffect(() => {
    if (!searchData.data?.results && active) {
      const timeout = setTimeout(() => {
        setError("No Data Found")
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [searchData, active]);

  return { searchData, active, loading, value, handleFetchData, handleClick ,error };
}

const SearchList = ({ searchData, active, value, loading, handleClick,error }) => (
  <UnorderedList
    className="searchlist"
    position="absolute"
    top="100%"
    left={0}
    width="100%"
    py="25px"
    background="white"
    boxShadow="0 10px 20px rgba(0,0,0,0.5)"
    margin={0}
    borderRadius={15}
    listStyleType="none"
    display={active && value.name !== '' ? 'block' : 'none'}
  >
    {searchData.data?.results !== undefined ? searchData.data?.results?.map((item) => (
      <ListItem key={item.id} py="7px" px="25px" onClick={() => handleClick(item.latitude, item.longitude, `${item.name}, ${item.admin1}`)}>
        <div className='listdata'>
          <Image mr='3px' src={`https://flagcdn.com/32x24/${item.country_code.toLowerCase()}.png`} fallbackSrc='https://via.placeholder.com/16x12' />
          <Heading as='h2' size='sm' noOfLines={1}>{item.name}</Heading>,
          <Text pl="3px" fontSize='sm' color={'#828282'} className='list_district'>{item.admin1}</Text>
        </div>
      </ListItem>
    )):(<> <ListItem color={"blackAlpha.800"} textAlign={'center'}>{error}</ListItem></>)
    
    }
    {loading && value.name !== '' && (
      <Stack px="25px">
        <Skeleton height='15px' />
        <Skeleton height='15px' />
        <Skeleton height='15px' />
      </Stack>
    )}
  </UnorderedList>
);

const InputWrapper = () => {
  const { searchData, active, loading, value, handleFetchData, handleClick, error } = useSearchData();

  return (
    <>
      <Flex justifyContent="center">
        <Box p='4'>
          <InputGroup width={400} position="relative">
            <Input
              pr='4.5rem'
              type="text"
              placeholder='Enter Location'
              onChange={handleFetchData}
              value={value.name}
            />
            <SearchList searchData={searchData} active={active} value={value} loading={loading} handleClick={handleClick} error={error} />
          </InputGroup>
        </Box>
      </Flex>

      <Flex>
        <WeatherCard />
      </Flex>
    </>
  )
}

export default InputWrapper;
