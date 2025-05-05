import { ColorModeButton } from '@/components/ui/color-mode';
import { type SharedData } from '@/types';
import { Box, Flex, Link as LinkChakra } from '@chakra-ui/react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            <Flex
                minH="max"
                flexDirection="column"
                alignItems="center"
                bg={{ base: '#FDFDFC', _dark: '#0a0a0a' }}
                p={{ base: '6', lg: '8' }}
                justifyContent={{ lg: 'center' }}
            >
                <Box as="header" mb="6" w="full" maxW={{ base: '335px', lg: '4xl' }} fontSize="sm">
                    <Flex as="nav" alignItems="center" justifyContent="end" gap="4">
                        {auth.user ? (
                            <LinkChakra
                                as={Link}
                                display="inline-block"
                                rounded="sm"
                                borderColor={{ base: { base: '#19140035', _hover: '#1915014a' }, _dark: { base: '#3E3E3A', _hover: '#62605b' } }}
                                px="5"
                                py="1.5"
                                fontSize="sm"
                                lineHeight="normal"
                                textDecoration={{ base: '#1b1b18', _dark: '#EDEDEC' }}
                                href={route('dashboard')}
                            >
                                Dashboard
                            </LinkChakra>
                        ) : (
                            <>
                                <LinkChakra
                                    as={Link}
                                    href={route('login')}
                                    display="inline-block"
                                    rounded="sm"
                                    px="5"
                                    py="1.5"
                                    fontSize="sm"
                                    lineHeight="normal"
                                    textDecorationColor={{ base: '#1b1b18', _dark: '#EDEDEC' }}
                                    borderColor={{ base: 'transparent', _hover: { base: '#19140035', _dark: '#3E3E3A' } }}
                                >
                                    Log in
                                </LinkChakra>
                                <LinkChakra
                                    as={Link}
                                    href={route('register')}
                                    display="inline-block"
                                    rounded="sm"
                                    px="5"
                                    py="1.5"
                                    fontSize="sm"
                                    lineHeight="normal"
                                    textDecorationColor={{ base: '#1b1b18', _dark: '#EDEDEC' }}
                                    borderColor={{ base: '#19140035', _dark: '#3E3E3A', _hover: { base: '#1915014a', _dark: '#62605b' } }}
                                >
                                    Register
                                </LinkChakra>
                            </>
                        )}
                        <ColorModeButton />
                    </Flex>
                </Box>
                <Flex
                    w="full"
                    alignItems="center"
                    justifyContent="center"
                    opacity={{ base: '100', _starting: '0' }}
                    transition={{ base: 'opacity', lg: 'grow' }}
                    animationDuration="750"
                >
                    <Flex as="main" flex="1" w="full" maxW={{ base: '335px', lg: '4xl' }} flexDirection={{ base: 'column-reverse', lg: 'row' }}>
                        Halo
                    </Flex>
                </Flex>
                <Box className="hidden h-14.5 lg:block"></Box>
            </Flex>
        </>
    );
}
