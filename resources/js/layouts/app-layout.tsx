import AppLogoIcon from '@/components/app-logo-icon';
import { ColorModeButton } from '@/components/ui/color-mode';
import { useSidebar } from '@/components/ui/SidebarContext';
import { Tooltip } from '@/components/ui/tooltip';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { hasRole } from '@/lib/utils';
import { NavItem, type SharedData } from '@/types';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Collapsible,
    Flex,
    Grid,
    Icon,
    IconButton,
    Link as LinkChakra,
    Menu,
    Portal,
    Separator,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { BsChat, BsChevronDown } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { MdCalendarMonth, MdClose, MdDashboard, MdSettings, MdStar } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';

const MENU_ITEMS: NavItem[] = [
    {
        id: '1',
        label: 'Dashboard',
        href: route('dashboard'),
        icon: MdDashboard,
    },
    {
        id: '2',
        label: 'Tes',
        href: route('tes'),
        icon: MdCalendarMonth,
    },
    {
        id: '3',
        label: 'Messages',
        icon: BsChat,
        subItems: [
            { id: '3-1', label: 'Inbox', icon: MdStar },
            { id: '3-2', label: 'Sent', icon: MdStar },
        ],
    },
    {
        id: '4',
        label: 'Admin',
        icon: MdSettings,
        role: 'admin',
        subItems: [
            { id: '4-1', label: 'Permission', icon: MdStar, href: route('permissions.index') },
            { id: '4-2', label: 'Role', icon: MdStar, href: route('roles.index') },
            { id: '4-3', label: 'User', icon: FaUser, href: route('users.index') },
        ],
    },
];

export default ({ children }: { children: React.ReactNode }) => {
    const { isOpen, toggleSidebar } = useSidebar();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const sidebarWidth = isOpen ? '250px' : '60px';

    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();
    // console.log('auth', auth);
    return (
        <Flex h="100vh" gap={0}>
            {/* Sidebar */}
            <Box
                w={sidebarWidth}
                transition="all 0.3s ease"
                bg={{ base: 'white', _dark: 'gray.800' }}
                borderRight="1px solid"
                borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
            >
                <Stack h="100vh" p={4} gap={4} overflowY="auto">
                    <Stack gap={1}>
                        <Flex flexDir="row" alignItems="center" justifyContent="center" textAlign="center">
                            <Icon maxW={5} maxH={5} color={{ base: 'black', _dark: 'white' }} justifyContent="center" alignItems="center" mb={2}>
                                <AppLogoIcon />
                            </Icon>
                            {isOpen ? (
                                <Text fontSize="lg" fontWeight="bold" color={{ base: 'black', _dark: 'white' }}>
                                    Layanan Transportasi
                                </Text>
                            ) : (
                                ''
                            )}
                        </Flex>
                        <Separator orientation="horizontal" />
                        {MENU_ITEMS.map((item) => (
                            <Tooltip
                                showArrow
                                content={item.label}
                                disabled={isOpen}
                                key={item.id}
                                positioning={{ placement: 'right-end' }}
                                contentProps={{ css: { '--tooltip-bg': 'tomato' } }}
                            >
                                {/* {() => console.log(hasRole(item.role))} */}
                                <Box key={item.id}>
                                    <LinkChakra
                                        hidden={hasRole(item.role)}
                                        as={item.subItems ? undefined : Link}
                                        href={item.href}
                                        display="flex"
                                        alignItems="center"
                                        p={2}
                                        pl={1}
                                        borderRadius="md"
                                        gap={2}
                                        _hover={{
                                            bg: 'blue.50',
                                            color: 'blue.600',
                                        }}
                                        onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                                    >
                                        <Icon as={item.icon} boxSize={5} />
                                        {isOpen && (
                                            <>
                                                <Text flex={1}>{item.label}</Text>
                                                {item.subItems && (
                                                    <Icon
                                                        as={BsChevronDown}
                                                        boxSize={4}
                                                        transform={openMenu === item.id ? 'rotate(180deg)' : ''}
                                                        transition="transform 0.2s"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </LinkChakra>

                                    {item.subItems && (
                                        <Collapsible.Root
                                            open={openMenu === item.id}
                                            onOpenChange={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                                        >
                                            <Collapsible.Content>
                                                <Stack gap={1} pl={isOpen ? 5 : 0} mt={1} p={isOpen ? 1 : 0}>
                                                    {item.subItems.map((subItem) => (
                                                        <LinkChakra
                                                            as={Link}
                                                            href={subItem.href}
                                                            key={subItem.id}
                                                            p={2}
                                                            borderRadius="md"
                                                            _hover={{
                                                                bg: 'blue.50',
                                                                color: 'blue.600',
                                                            }}
                                                        >
                                                            {isOpen ? (
                                                                <>
                                                                    <Icon as={subItem.icon} />
                                                                    <Text>{subItem.label}</Text>
                                                                </>
                                                            ) : (
                                                                <Icon as={subItem.icon} boxSize={3} />
                                                            )}
                                                        </LinkChakra>
                                                    ))}
                                                </Stack>
                                            </Collapsible.Content>
                                        </Collapsible.Root>
                                    )}
                                </Box>
                            </Tooltip>
                        ))}
                    </Stack>
                </Stack>
            </Box>

            {/* Main Content Area */}
            <Flex direction="column" flex={1} gap={0}>
                {/* Navbar */}
                <Box bg={{ base: 'white', _dark: 'gray.800' }} borderBottom="1px" borderColor={{ base: 'gray.200', _dark: 'gray.700' }} px={4} py={2}>
                    <Flex align="center" gap={4}>
                        <IconButton aria-label="Toggle Sidebar" onClick={() => toggleSidebar()} size="sm" variant="ghost">
                            {isOpen ? <MdClose /> : <RxHamburgerMenu />}
                        </IconButton>
                        {!isOpen ? (
                            <Text fontSize="lg" fontWeight="bold" color={{ base: 'black', _dark: 'white' }}>
                                Layanan Transportasi
                            </Text>
                        ) : (
                            ''
                        )}

                        <Flex flex={1} justify="flex-end" gap={4}>
                            {auth.user ? (
                                <Menu.Root>
                                    <Menu.Trigger asChild>
                                        <Button boxSize="10" rounded="full" p="1" _hover={{ bg: 'acc' }}>
                                            <AvatarGroup>
                                                <Avatar.Root boxSize="8" overflow="hidden" rounded="full">
                                                    <Avatar.Fallback rounded="lg" textDecorationColor={{ base: 'black', _dark: 'white' }}>
                                                        {getInitials(auth.user.name)}
                                                    </Avatar.Fallback>
                                                    <Avatar.Image src={auth.user.avatar} alt={auth.user.name} />
                                                </Avatar.Root>
                                            </AvatarGroup>
                                        </Button>
                                    </Menu.Trigger>
                                    <Portal>
                                        <Menu.Positioner>
                                            <Menu.Content w="56" alignItems="end">
                                                <Menu.Item alignItems="center" gap="2" px="1" py="1.5" textAlign="left" fontSize="sm" value="Profile">
                                                    <AvatarGroup>
                                                        <Avatar.Root h="8" w="8" overflow="hidden" rounded="full">
                                                            <Avatar.Fallback rounded="lg" textDecorationColor={{ base: 'black', _dark: 'white' }}>
                                                                {getInitials(auth.user.name)}
                                                            </Avatar.Fallback>
                                                            <Avatar.Image src={auth.user.avatar} alt={auth.user.name} />
                                                        </Avatar.Root>
                                                    </AvatarGroup>
                                                    <Grid flex="auto" textAlign="left" fontSize="sm" lineHeight="tight">
                                                        <Text truncate lineHeight="medium">
                                                            {auth.user.name}
                                                        </Text>

                                                        <Text truncate fontSize="xs">
                                                            {auth.user.email}
                                                        </Text>
                                                    </Grid>
                                                </Menu.Item>
                                                {/* </Menu.ItemGroup> */}
                                                <Menu.Separator />
                                                <Menu.Item asChild value="Settings" width="full" border="none">
                                                    {/* <LinkChakra display="block" w="full" href={route('profile.edit')} onClick={cleanup}> */}
                                                    <LinkChakra
                                                        as={Link}
                                                        display="block"
                                                        w="full"
                                                        dir="column"
                                                        border="none"
                                                        href={route('profile.edit')}
                                                        onClick={cleanup}
                                                    >
                                                        <Flex width="full" dir="column">
                                                            <Icon mr="2">
                                                                <Settings />
                                                            </Icon>
                                                            <Text lineHeight="medium">Settings</Text>
                                                        </Flex>
                                                        {/* </Link> */}
                                                    </LinkChakra>
                                                </Menu.Item>
                                                <Menu.Item asChild value="Logout">
                                                    <Link as="button" method="post" href={route('logout')} onClick={cleanup} width="full">
                                                        <Flex display="block" width="full" dir="column">
                                                            <Icon mr="2">
                                                                <LogOut />
                                                            </Icon>
                                                            Log out
                                                        </Flex>
                                                    </Link>
                                                </Menu.Item>
                                            </Menu.Content>
                                        </Menu.Positioner>
                                    </Portal>
                                </Menu.Root>
                            ) : (
                                ''
                            )}

                            <ColorModeButton />
                        </Flex>
                    </Flex>
                </Box>

                {/* Content Area */}
                <Box flex={1} p={4} overflowY="auto" bg={{ base: 'gray.50', _dark: 'gray.900' }}>
                    {/* <Stack gap={4}> */}
                    {/* <Text fontSize="2xl" fontWeight="semibold">
                            Dashboard Overview
                        </Text> */}
                    <Box p={4} bg={{ base: 'white', _dark: 'gray.800' }} borderRadius="md" boxShadow="sm">
                        {children}
                    </Box>
                    {/* </Stack> */}
                </Box>
            </Flex>
        </Flex>
    );
};
