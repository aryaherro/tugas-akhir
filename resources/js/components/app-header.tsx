import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Icon } from '@/components2/icon';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import {
    Avatar as AvatarChakra,
    AvatarGroup,
    Box,
    Button as ButtonChakra,
    CloseButton,
    Drawer,
    Flex,
    Grid,
    Icon as IconChakra,
    Link as LinkChakra,
    Menu as MenuChakra,
    Portal,
    Text,
    VisuallyHidden,
} from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, LogOut, Menu, Settings } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { ColorModeButton } from './ui/color-mode';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: 'dashboard',
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();
    return (
        <>
            <Box
                borderBottomWidth="1"
                // className="border-sidebar-border/80 border-b"
            >
                <Flex mx="auto" h="16" alignItems="center" px="4" maxW={{ md: '7xl' }}>
                    {/* Mobile Menu */}
                    <Box hideFrom="lg">
                        <Drawer.Root placement="start">
                            <Drawer.Trigger asChild>
                                <ButtonChakra
                                    size="sm"
                                    mr="2"
                                    h="34px"
                                    w="34px"
                                    data-slot="button"
                                    display="inline-flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap="2"
                                    whiteSpace="nowrap"
                                    rounded="md"
                                    fontSize="sm"
                                    fontWeight="medium"
                                >
                                    <IconChakra h="5" w="5">
                                        <Menu />
                                    </IconChakra>
                                </ButtonChakra>
                            </Drawer.Trigger>
                            <Portal>
                                <Drawer.Backdrop />
                                <Drawer.Positioner>
                                    <Drawer.Content
                                        display="flex"
                                        h="full"
                                        w="64"
                                        flexDir="column"
                                        alignItems="stretch"
                                        justifyContent="space-between"
                                    >
                                        <VisuallyHidden>Navigation Menu</VisuallyHidden>
                                        <Drawer.Header>
                                            <Drawer.Title display="flex" flexDir="column" justifyContent="center" textAlign="center">
                                                <IconChakra h="6" w="6" color={{ base: 'black', _dark: 'white' }}>
                                                    <AppLogoIcon
                                                    // className="h-6 w-6 fill-current text-black dark:text-white"
                                                    />
                                                </IconChakra>
                                                Layanan Transportasi
                                            </Drawer.Title>
                                        </Drawer.Header>
                                        <Drawer.Body display="flex" flex="auto" flexDir="column" spaceY="4" p="4">
                                            <Flex h="full" flexDir="column" justifyContent="space-between" fontSize="sm">
                                                <Flex flexDir="column" spaceY="4">
                                                    {mainNavItems.map((item) => (
                                                        <LinkChakra
                                                            as={Link}
                                                            display="flex"
                                                            key={item.title}
                                                            href={item.href}
                                                            alignItems="center"
                                                            spaceX="2"
                                                            fontWeight="medium"
                                                            bgColor={route(item.href).includes(page.url) ? { base: 'cyan.400', _dark: 'gray' } : ''}
                                                        >
                                                            {item.icon && (
                                                                <IconChakra h="5" w="5">
                                                                    <Icon iconNode={item.icon} />
                                                                </IconChakra>
                                                            )}
                                                            <span>{item.title}</span>
                                                        </LinkChakra>
                                                    ))}
                                                </Flex>

                                                <Flex flexDir="column" spaceY="4">
                                                    {rightNavItems.map((item) => (
                                                        <LinkChakra
                                                            as="a"
                                                            key={item.title}
                                                            href={item.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            display="flex"
                                                            alignItems="center"
                                                            spaceX="2"
                                                            fontWeight="medium"
                                                        >
                                                            {item.icon && (
                                                                <IconChakra h="5" w="5">
                                                                    <Icon iconNode={item.icon} />
                                                                </IconChakra>
                                                            )}
                                                            <span>{item.title}</span>
                                                        </LinkChakra>
                                                    ))}
                                                </Flex>
                                            </Flex>
                                        </Drawer.Body>
                                        {/* <Drawer.Footer>
                                            <Button variant="outline">Cancel</Button>
                                            <Button>Save</Button>
                                        </Drawer.Footer> */}
                                        <Drawer.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Drawer.CloseTrigger>
                                    </Drawer.Content>
                                </Drawer.Positioner>
                            </Portal>
                        </Drawer.Root>
                    </Box>
                    <LinkChakra as={Link} display="flex" alignItems="center" spaceX="2" href={route('dashboard')}>
                        <AppLogo />
                    </LinkChakra>

                    {/* Desktop Navigation */}
                    <Box
                        hideBelow="lg"
                        // display={{ base: 'hidden', lg: 'flex' }}
                        // _hidden={{ base: true, lg: false }}
                        h="full"
                        ml="6"
                        alignItems="center"
                        spaceX="6"
                        display={{ lg: 'Flex' }}
                    >
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <LinkChakra
                                            as={Link}
                                            href={route(item.href)}
                                            h={route(item.href).includes(page.url) ? '9' : ''}
                                            cursor={route(item.href).includes(page.url) ? 'pointer' : ''}
                                            px={route(item.href).includes(page.url) ? '3' : ''}
                                            bgColor={route(item.href).includes(page.url) ? { base: 'cyan.400', _dark: 'gray' } : ''}
                                            // "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent/50 data-[state=open]:bg-accent/50 data-[active=true]:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                // page.url === item.href && activeItemStyles,
                                                // 'h-9 cursor-pointer px-3',
                                            )}
                                        >
                                            {item.icon && (
                                                <IconChakra mr="2" h="4" w="4">
                                                    <Icon iconNode={item.icon} />
                                                </IconChakra>
                                            )}
                                            {item.title}
                                        </LinkChakra>
                                        {/* {page.url === item.href && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )} */}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </Box>
                    <Flex ml="auto" alignItems="center" spaceX="2">
                        <Flex position="relative" alignItems="center" spaceX="1">
                            {/* <Button variant="ghost" size="sm" className="group h-9 w-9 cursor-pointer">
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button> */}

                            {/* <Flex hideBelow="lg">
                                {rightNavItems.map((item) => (
                                    <TooltipProvider key={item.title} delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    <span className="sr-only">{item.title}</span>
                                                    {item.icon && <Icon iconNode={item.icon} className="size-5 opacity-80 group-hover:opacity-100" />}
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </Flex> */}
                        </Flex>
                        <MenuChakra.Root>
                            <MenuChakra.Trigger asChild>
                                <Button
                                    boxSize="10"
                                    rounded="full"
                                    p="1"
                                    _hover={{ bg: 'acc' }}
                                    // variant="ghost" className="size-10 rounded-full p-1"
                                    // hover:bg-accent hover:text-accent-foreground
                                >
                                    <AvatarGroup>
                                        <AvatarChakra.Root boxSize="8" overflow="hidden" rounded="full">
                                            <AvatarChakra.Fallback rounded="lg" textDecorationColor={{ base: 'black', _dark: 'white' }}>
                                                {getInitials(auth.user.name)}
                                            </AvatarChakra.Fallback>
                                            <AvatarChakra.Image src={auth.user.avatar} alt={auth.user.name} />
                                        </AvatarChakra.Root>
                                    </AvatarGroup>
                                </Button>
                            </MenuChakra.Trigger>
                            <Portal>
                                <MenuChakra.Positioner>
                                    <MenuChakra.Content w="56" alignItems="end">
                                        {/* <MenuChakra.ItemGroup p="0" lineHeight="normal"> */}
                                        <MenuChakra.Item alignItems="center" gap="2" px="1" py="1.5" textAlign="left" fontSize="sm" value="Profile">
                                            {/* <UserInfo user={user} showEmail={true} /> */}
                                            <AvatarGroup>
                                                <AvatarChakra.Root h="8" w="8" overflow="hidden" rounded="full">
                                                    <AvatarChakra.Fallback rounded="lg" textDecorationColor={{ base: 'black', _dark: 'white' }}>
                                                        {getInitials(auth.user.name)}
                                                    </AvatarChakra.Fallback>
                                                    <AvatarChakra.Image src={auth.user.avatar} alt={auth.user.name} />
                                                </AvatarChakra.Root>
                                            </AvatarGroup>
                                            <Grid flex="auto" textAlign="left" fontSize="sm" lineHeight="tight">
                                                <Text truncate lineHeight="medium">
                                                    {auth.user.name}
                                                </Text>

                                                <Text
                                                    truncate
                                                    fontSize="xs"
                                                    // className="text-muted-foreground truncate text-xs"
                                                >
                                                    {auth.user.email}
                                                </Text>
                                            </Grid>
                                        </MenuChakra.Item>
                                        {/* </MenuChakra.ItemGroup> */}
                                        <MenuChakra.Separator />
                                        <MenuChakra.Item asChild value="Settings" width="full" border="none">
                                            {/* <LinkChakra display="block" w="full" href={route('profile.edit')} onClick={cleanup}> */}
                                            <LinkChakra
                                                as={Link}
                                                display="block"
                                                w="full"
                                                dir="column"
                                                border="none"
                                                href={route('profile.edit')}
                                                // as="button"
                                                // prefetch
                                                onClick={cleanup}
                                            >
                                                <Flex width="full" dir="column">
                                                    <IconChakra mr="2">
                                                        <Settings />
                                                    </IconChakra>
                                                    <Text lineHeight="medium">Settings</Text>
                                                </Flex>
                                                {/* </Link> */}
                                            </LinkChakra>
                                        </MenuChakra.Item>
                                        <MenuChakra.Item asChild value="Logout">
                                            <Link as="button" method="post" href={route('logout')} onClick={cleanup} width="full">
                                                <Flex display="block" width="full" dir="column">
                                                    <IconChakra mr="2">
                                                        <LogOut />
                                                    </IconChakra>
                                                    Log out
                                                </Flex>
                                            </Link>
                                        </MenuChakra.Item>
                                    </MenuChakra.Content>
                                </MenuChakra.Positioner>
                            </Portal>
                        </MenuChakra.Root>
                    </Flex>
                    <ColorModeButton />
                </Flex>
            </Box>
            {breadcrumbs.length > 1 && (
                <Flex
                    border="initial"
                    w="full"
                    // className="border-sidebar-border/70 flex w-full border-b"
                >
                    <Flex
                        mx="auto"
                        h="12"
                        alignItems="center"
                        justifyContent="start"
                        px="4"
                        md={{ maxW: '7xl' }}
                        // className="text-neutral-500"
                    >
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </Flex>
                </Flex>
            )}
        </>
    );
}
