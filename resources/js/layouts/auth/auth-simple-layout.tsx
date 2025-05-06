import AppLogoIcon from '@/components/app-logo-icon';
import { ColorModeButton } from '@/components/ui/color-mode';
import { Box, Card, Flex, Heading, Icon, Text, VisuallyHidden } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
            <Flex pr="5" pt="5" alignItems="flex-end" justifyContent="flex-end">
                <ColorModeButton />
            </Flex>
            <Flex minH="svh" flexDirection="column" alignItems="center" justifyContent="center" gap="6" p={{ base: '6', md: '10' }}>
                <Card.Root maxW="sm">
                    <Card.Header>
                        <Flex flexDirection="column" alignItems="center" gap="4">
                            <Link href={route('home')}>
                                <Flex mb="1" h="12" w="12" alignItems="center" justifyContent="center" rounded="md">
                                    <Icon
                                    // shadowColor="white" fill="current"
                                    >
                                        <AppLogoIcon
                                        // className="size-9 fill-current text-[var(--foreground)] dark:text-white"
                                        />
                                    </Icon>
                                </Flex>
                                <VisuallyHidden>{title}</VisuallyHidden>
                            </Link>

                            <Box spaceY="2" textAlign="center">
                                <Heading size="xl" fontWeight="medium">
                                    {title}
                                </Heading>
                                <Text textAlign="center" fontSize="sm">
                                    {description}
                                </Text>
                            </Box>
                        </Flex>
                    </Card.Header>
                    <Card.Body>{children}</Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        {/* <Button variant="outline">Cancel</Button>
                    <Button variant="solid">Sign in</Button> */}
                    </Card.Footer>
                </Card.Root>
                {/* <Box w="full" maxW="sm" borderWidth="2px" borderBlock="Window" p="4">
                    <Flex flexDirection="column" gap="8">
                        <Flex flexDirection="column" alignItems="center" gap="4">
                            <Link href={route('home')}>
                                <Flex mb="1" h="9" w="9" alignItems="center" justifyContent="center" rounded="md">
                                    <Icon shadowColor="white" fill="current">
                                        <AppLogoIcon
                                        // className="size-9 fill-current text-[var(--foreground)] dark:text-white"
                                        />
                                    </Icon>
                                </Flex>
                                <VisuallyHidden>{title}</VisuallyHidden>
                            </Link>

                            <Box spaceY="2" textAlign="center">
                                <Heading size="xl" fontWeight="medium">
                                    {title}
                                </Heading>
                                <Text textAlign="center" fontSize="sm">
                                    {description}
                                </Text>
                            </Box>
                        </Flex>
                        {children}
                    </Flex>
                </Box> */}
            </Flex>
        </>
    );
}
