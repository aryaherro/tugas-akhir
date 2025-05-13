import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Flex, Grid } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Index',
        href: route('dashboard'),
    },
];

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                <Grid gridAutoRows="min-content" gap="4" md={{ gridColumn: '3' }}>
                    Dasboard
                </Grid>
            </Flex>
        </AppLayout>
    );
}
