import { Box, Collapsible, Flex, Icon, IconButton, Link, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { BsChat, BsChevronDown } from 'react-icons/bs';
import { MdCalendarMonth, MdClose, MdSettings, MdStar } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';

interface NavItem {
    id: string;
    label: string;
    icon: typeof MdCalendarMonth;
    subItems?: NavItem[];
}

const MENU_ITEMS: NavItem[] = [
    {
        id: '1',
        label: 'Dashboard',
        icon: MdCalendarMonth,
        subItems: [
            { id: '1-1', label: 'Overview', icon: MdStar },
            { id: '1-2', label: 'Analytics', icon: MdStar },
        ],
    },
    {
        id: '2',
        label: 'Messages',
        icon: BsChat,
        subItems: [
            { id: '2-1', label: 'Inbox', icon: MdStar },
            { id: '2-2', label: 'Sent', icon: MdStar },
        ],
    },
    {
        id: '3',
        label: 'Settings',
        icon: MdSettings,
        subItems: [
            { id: '3-1', label: 'Account', icon: MdStar },
            { id: '3-2', label: 'Security', icon: MdStar },
        ],
    },
];

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const { open, onToggle } = useDisclosure();

    const toggleSidebar = () => setIsExpanded(!isExpanded);
    const sidebarWidth = isExpanded ? '250px' : '60px';

    return (
        <Flex height="100vh">
            {/* Sidebar */}
            <Box
                w={sidebarWidth}
                transition="all 0.3s ease"
                bg={{ base: 'white', _dark: 'gray.800' }}
                borderRight="1px solid"
                borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                position="relative"
            >
                <IconButton aria-label="Toggle Sidebar" onClick={toggleSidebar} size="sm" position="absolute" right={-4} top={4} zIndex={1}>
                    {isExpanded ? <MdClose /> : <RxHamburgerMenu />}
                </IconButton>

                <Stack gap={4} p={4}>
                    {MENU_ITEMS.map((item) => (
                        <Box key={item.id}>
                            <Link
                                display="flex"
                                alignItems="center"
                                p={2}
                                borderRadius="md"
                                _hover={{
                                    bg: 'blue.50',
                                    color: 'blue.600',
                                }}
                                onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                            >
                                <Icon as={item.icon} boxSize={5} />
                                {isExpanded && (
                                    <>
                                        <Text ml={2} flex={1}>
                                            {item.label}
                                        </Text>
                                        <Icon
                                            as={BsChevronDown}
                                            boxSize={4}
                                            transform={openMenu === item.id ? 'rotate(180deg)' : ''}
                                            transition="transform 0.2s"
                                        />
                                    </>
                                )}
                            </Link>

                            {item.subItems && (
                                <Collapsible.Root open={openMenu === item.id} onOpenChange={() => setOpenMenu(openMenu === item.id ? null : item.id)}>
                                    {/* <Collapsible.Trigger paddingY="3">Toggle Collapse (Unmount on exit)</Collapsible.Trigger> */}
                                    <Collapsible.Content>
                                        <Stack pl={isExpanded ? 8 : 0} mt={1}>
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.id}
                                                    p={2}
                                                    borderRadius="md"
                                                    _hover={{
                                                        bg: 'blue.50',
                                                        color: 'blue.600',
                                                    }}
                                                >
                                                    {isExpanded ? <Text>{subItem.label}</Text> : <Icon as={subItem.icon} boxSize={5} />}
                                                </Link>
                                            ))}
                                        </Stack>
                                    </Collapsible.Content>
                                </Collapsible.Root>
                            )}
                        </Box>
                    ))}
                </Stack>
            </Box>

            {/* Main Content */}
            <Box flex={1} p={4} bg={{ base: 'gray.50', _dark: 'gray.900' }}>
                <Text fontSize="2xl">Main Content Area</Text>
                <Text mt={2}>Content goes here...</Text>
            </Box>
        </Flex>
    );
};

export default Sidebar;
