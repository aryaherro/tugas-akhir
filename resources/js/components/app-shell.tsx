import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { Flex } from '@chakra-ui/react';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <Flex minH="100vh" w="full" flexDir="column">
                {children}
            </Flex>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
