import { Box, Button, Flex, Heading, Image, Input, InputGroup, InputRightElement, ListItem, Skeleton, Stack, Text, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { weatherSearchApi } from '../utils/api'
import debounce from '../utils/debounce';

const InputWrapper = () => {
    const [searchData, setSearchData] = useState([])
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const debouncedFetchData = debounce(fetchData, 300);

    const handleFetchData = async (e) => {
        setActive(true)
        
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
        } catch (error) {
            setError("No Data Found")
        }
        setActive(true)
        setLoading(false)
    }
    console.log(searchData.data?.results)

    const handleClick = (e, lat, lng) => {
        console.log(lat, lng)
        setActive(false)
    }

    return (
        <Flex justifyContent="center">
            <Box p='4'>
                <InputGroup width={400} position="relative">
                    <Input
                        pr='4.5rem'
                        type="text"
                        placeholder='Enter Location'
                        onChange={(e) => handleFetchData(e)}
                    />
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
                        opacity={active ? 1 : 0}
                    >
                        {
                            searchData.data?.results !== undefined ? (
                                searchData.data?.results.map((item, i) => {
                                    return (
                                        <ListItem py="7px" px="25px" onClick={(e, i) => handleClick(e, item.latitude, item.longitude)}>
                                            <div className='listdata'>
                                                <Image mr='3px' src={`https://flagcdn.com/32x24/${item.country_code.toLowerCase()}.png`} fallbackSrc='https://via.placeholder.com/16x12' />
                                                <Heading as='h2' size='sm' noOfLines={1}>{item.name}</Heading>,
                                                <Text pl="3px" fontSize='sm' color={'#828282'} className='list_district'>{item.admin1}</Text>
                                            </div>
                                        </ListItem>
                                    )
                                })
                            ) : (
                                <Stack px="25px">
                                    <Skeleton height='20px' />
                                    <Skeleton height='20px' />
                                    <Skeleton height='20px' />
                                </Stack>
                            )
                        }
                    </UnorderedList>
                </InputGroup>
            </Box>
        </Flex>
    )
}

export default InputWrapper