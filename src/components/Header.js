import React from 'react'
import { Box, Heading, useColorMode } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
const Header = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <header style={{ position: "absolute", top: 0, left: 0, width: "100%", "--theme-color": colorMode === "dark" ? "#00000080" : "#ffffffcc" }}>
            <Box w='100%' p={4} color={colorMode === "dark" ? "#fff" : "#232323"} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #e2e8f0">
                <Heading as="h3" size="md" bgGradient='linear(to-l, #007cf0, #00dfd8)' bgClip='text' position="relative">Weather App</Heading>
                <ColorModeSwitcher />
            </Box>
        </header>
    )
}

export default Header