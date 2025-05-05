import Heading from '@/components/heading';
import { Button } from '@/components2/ui/button';
// import { Separator } from '@/components2/ui/separator';
import { type NavItem } from '@/types';
import { Box, Button as ButtonChakra, Container, Flex, Link as LinkChakra, Separator } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/settings/password',
        icon: null,
    },
    // {
    //     title: 'Appearance',
    //     href: '/settings/appearance',
    //     icon: null,
    // },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <Box px="4" py="6">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <Flex flexDir={{ base: 'col', lg: 'row' }} spaceY={{ base: '8', lg: '0' }} spaceX={{ lg: '12' }}>
                <Box as="aside" w={{ base: 'full', lg: '48' }} maxW="lg">
                    <Flex as="nav" flexDir="column" spaceY="1" spaceX="0">
                        {sidebarNavItems.map((item, index) => (
                            <ButtonChakra
                                as={Button}
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                w="full"
                                justifyContent="start"
                                bgColor={currentPath === item.href ? 'bg.muted' : ''}
                                // className={cn('w-full justify-start', {
                                //     'bg-muted': currentPath === item.href,
                                // })}
                            >
                                <LinkChakra
                                    as={Link}
                                    href={item.href}
                                    // prefetch
                                >
                                    {item.title}
                                </LinkChakra>
                            </ButtonChakra>
                        ))}
                    </Flex>
                </Box>

                <Separator hideBelow="md" my="6" />

                <Flex flex="auto" maxW={{ md: '2xl' }}>
                    <Container as="section" maxW="xl" spaceY="12">
                        {children}
                    </Container>
                </Flex>
            </Flex>
        </Box>
    );
}
