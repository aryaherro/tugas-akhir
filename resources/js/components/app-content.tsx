import { SidebarInset } from '@/components/ui/sidebar';
import { Flex } from '@chakra-ui/react';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <Flex as="main" mx="auto" h="full" w="full" maxW="7xl" flex="auto" flexDirection="column" gap="4" rounded="xl">
            {children}
        </Flex>
    );
}
