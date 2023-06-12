import { AbsoluteCenter, Box, Code, Divider, Flex, Heading, Image, Input, InputGroup, ListItem, Skeleton, Stack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Tag, Text, UnorderedList, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CoordinateApi, weatherSearchApi } from '../utils/api'
import debounce from '../utils/debounce';
import WeatherCard from "./weatherCard";
import { getMessage, getWeatherIcon } from "./extend_fun";

const useSearchData = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const [searchData, setSearchData] = useState([])
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [value, setValue] = useState({ lat: 23.0621, lng: 72.568, name: 'Ahmedabad, Gujarat' })
  const [selected_suggestion, set_selected_suggestion] = useState({ lat: 23.0621, lng: 72.568, name: 'Ahmedabad, Gujarat' })
  const debouncedFetchData = debounce(fetchData, 300);
  const { lat, lng, name } = value;
  const [coordinateData, setCoordinateData] = useState('')

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

  const fetchCoordinateData = async () => {
    if (lat && lng) {
      try {
        const { data } = await CoordinateApi(lat, lng);
        return data
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    let isMount = true;

    isMount && (async () => {
      const weatherCoordinate = await fetchCoordinateData()
      setCoordinateData(weatherCoordinate);

    })()

    return () => { isMount = false }
  }, [lat, lng, name])

  const handleClick = (lat, lng, name) => {
    setValue({ ...value, lat, lng, name })
    set_selected_suggestion({ ...value, lat, lng, name })
    setActive(false)
  }

  useEffect(() => {
    if (!searchData.data?.results && active) {
      const timeout = setTimeout(() => {
        setError("No Data Found")
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [searchData, active]);

  return { searchData, active, loading, value, handleFetchData, handleClick, error, coordinateData, selected_suggestion, colorMode };
}

const SearchList = ({ searchData, active, value, loading, handleClick, error, colorMode }) => (
  <UnorderedList
    className="searchlist"
    position="absolute"
    top="100%"
    left={0}
    width="100%"
    py="25px"
    background={colorMode === 'dark' ? '#121212' : "#fff"}
    boxShadow="0 10px 20px rgba(0,0,0,0.5)"
    margin={0}
    borderRadius={15}
    listStyleType="none"
    display={active && value.name.length > 1 ? 'block' : 'none'}
  >
    {(searchData.data?.results !== undefined && value.name.length > 1) ? searchData.data?.results?.map((item) => (
      <ListItem key={item.id} py="7px" px="25px" onClick={() => handleClick(item.latitude, item.longitude, `${item.name}${item.admin1 !== undefined ? `, ${item.admin1}` : ''}`)} _hover={{ color: "#232323" }}>
        <div className='listdata'>
          <Image mr='3px' src={`https://flagcdn.com/32x24/${item.country_code.toLowerCase()}.png`} fallbackSrc='https://via.placeholder.com/16x12' />
          <Heading as='h2' size='sm' noOfLines={1}>{item.name}</Heading>,
          <Text pl="3px" fontSize='sm' color={'#828282'} className='list_district'>{item.admin1}</Text>
        </div>
      </ListItem>
    )) : (<> <ListItem color={colorMode === 'dark' ? "#fff" : "blackAlpha.800"} textAlign={'center'}>{error}</ListItem></>)

    }
    {
      loading && value.name.length > 1 && (
        <Stack px="25px">
          <Skeleton height='15px' />
          <Skeleton height='15px' />
          <Skeleton height='15px' />
        </Stack>
      )
    }
  </UnorderedList >
);

const InputWrapper = () => {
  const { searchData, active, loading, value, handleFetchData, handleClick, error, coordinateData, selected_suggestion, colorMode } = useSearchData();

  return (
    <>
      {coordinateData &&
        <>
          <Box width={['100%', '100%', '100%', '100%', '30%']} zIndex={1}>
            {/* Sidebar Content */}
            <Flex justifyContent="center">
              <Box p='4' zIndex={1}>
                <InputGroup width={[300, 400, 350, 400, 300, 400]} position="relative">
                  <Input
                    pr='4.5rem'
                    type="text"
                    placeholder='Enter Location'
                    onChange={handleFetchData}
                    value={value.name}
                  />
                  <SearchList searchData={searchData} active={active} value={value} loading={loading} handleClick={handleClick} error={error} colorMode={colorMode} />
                </InputGroup>
              </Box>
            </Flex>
            <Flex justifyContent="center">
              <Box mt="8" mb="8" width='90%'>
                {/* Sidebar Content */}

                <Image
                  src={getWeatherIcon(coordinateData.current_weather?.weathercode)}
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                  width={20}
                  mx='auto'
                  my='0'
                  pt="10"

                />
                <Box position='relative' padding='10'>
                  <Divider sx={{ borderColor: "#d3d3d3" }} />
                  <AbsoluteCenter bg={colorMode === 'dark' ? '#d3d3d3' : '#232323'} px='4'>
                    <Text color={colorMode === 'dark' ? '#232323' : '#fff'}>Today</Text>
                  </AbsoluteCenter>
                </Box>
                <Box px="10">
                  <StatGroup py="5">
                    <Stat>
                      <StatLabel>Temperature</StatLabel>
                      <StatNumber>{coordinateData.daily.temperature_2m_max[0]}º</StatNumber>
                      <StatHelpText>
                        <StatArrow type='decrease' />
                        {coordinateData.daily.temperature_2m_min[0]}º
                      </StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>Humidity</StatLabel>
                      <StatNumber>{coordinateData?.hourly?.relativehumidity_2m[0]}</StatNumber>
                    </Stat>
                  </StatGroup>
                  <Divider />
                  <Text pt="5"><Tag>latitude</Tag> : {coordinateData.latitude}</Text>
                  <br />
                  <Text><Tag>longitude</Tag> : {coordinateData.longitude}</Text>
                  <br />
                  <Text><Tag>City</Tag> : {selected_suggestion.name}</Text>
                  <br />
                  <Text><Tag>windspeed</Tag> : {coordinateData.current_weather?.windspeed}</Text>
                  <br />

                  <Text><Tag>Weather Code (wmo)</Tag>: <Code> {coordinateData.current_weather?.weathercode}</Code> {getMessage(coordinateData.current_weather?.weathercode)}</Text>
                </Box>
              </Box>
            </Flex>
            <Flex>

            </Flex>
          </Box>

          <Flex flexDirection={['column', 'column', 'column']} flex="1">


            <Box flex='1' backgroundColor={colorMode === 'dark' ? '#181818' : 'gray.100'}>


              {coordinateData ? <WeatherCard data={coordinateData} /> : 'Loading'}


            </Box>

          </Flex>
        </>
      }
    </>
  )
}

export default InputWrapper;
