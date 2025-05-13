import { Toaster, toaster } from '@/components/ui/toaster';
import AppLayout from '@/layouts/app-layout';
import { Box, Button, ButtonGroup, Center, Dialog, Field, Flex, Grid, IconButton, Input, Pagination, Portal, Stack, Table } from '@chakra-ui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

type PermissionType = {
    id: number;
    name: string;
    guard_name: string;
};

export default () =>
    // { children }: { children: React.ReactNode }
    {
        type PermissionsResponse = {
            currentPage: number;
            perPage: number;
            total: number;
            data: PermissionType[];
            [key: string]: unknown;
            // Add other properties like meta, links if needed
        };

        const { permissions, filters } = usePage<{ permissions: PermissionsResponse; filters: any }>().props;
        const [open, setOpen] = useState(false);
        const [modal, setModal] = useState('create' as 'create' | 'edit' | 'delete');

        const {
            data: permission,
            setData: setPermission,
            post,
            reset,
            processing,
            errors,
        } = useForm<{
            id: number | null;
            name: string;
            guard_name: string;
        }>({
            id: null,
            name: '',
            guard_name: 'web',
        });
        const submit: FormEventHandler = (e) => {
            e.preventDefault();
            // console.log('permission', e);
            if (modal === 'create') {
                router.post(
                    route('permissions.store'),
                    {
                        name: permission.name,
                        guard_name: permission.guard_name,
                    },
                    {
                        onSuccess: () => {
                            reset();
                            setOpen(false);
                            toaster.create({
                                title: 'Permission created',
                                type: 'success',
                            });
                        },
                    },
                );
            } else if (modal === 'edit') {
                if (permission.id !== null) {
                    router.put(
                        route('permissions.update', { id: permission.id }),
                        {
                            name: permission.name,
                            guard_name: permission.guard_name,
                        },
                        {
                            onSuccess: () => {
                                reset();
                                setOpen(false);
                                toaster.create({
                                    title: 'Permission updated',
                                    type: 'success',
                                });
                            },
                        },
                    );
                }
            } else if (modal === 'delete') {
                if (permission.id !== null) {
                    router.delete(route('permissions.destroy', { id: permission.id }), {
                        onSuccess: () => {
                            reset();
                            setOpen(false);
                            toaster.create({
                                title: 'Permission deleted',
                                type: 'error',
                            });
                        },
                    });
                }
            }
            reset();
            setOpen(false);
        };
        // console.log('permissions', permissions);
        return (
            <AppLayout>
                <Head title="Permissions Management" />
                <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                    <Grid gridAutoRows="min-content" gap="4" md={{ gridColumn: '3' }}>
                        <Toaster />
                        {/* <Head title="Permissions Management" /> */}

                        <Box display="flex" justifyContent="space-Between" alignItems="center">
                            <Dialog.Root
                                lazyMount
                                open={open}
                                onOpenChange={(e) => setOpen(e.open)}
                                onExitComplete={() => reset()}
                                size="sm"
                                placement="center"
                            >
                                <Dialog.Trigger asChild>
                                    <Button variant="surface" onClick={() => setModal('create')}>
                                        Buat Permission
                                    </Button>
                                </Dialog.Trigger>
                                <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content>
                                            <Dialog.Header>
                                                <Dialog.Title>
                                                    {modal === 'create'
                                                        ? 'Buat Permission'
                                                        : modal === 'edit'
                                                          ? 'Edit Permission'
                                                          : 'Delete Permission'}
                                                </Dialog.Title>
                                            </Dialog.Header>
                                            <Dialog.Body pb="4">
                                                <Stack gap="4">
                                                    {modal === 'delete' ? (
                                                        <Dialog.Description>
                                                            Apakah anda yakin ingin menghapus permission <strong>{permission.name}</strong>?
                                                        </Dialog.Description>
                                                    ) : (
                                                        <Field.Root>
                                                            <Field.Label>Nama Permission</Field.Label>
                                                            <Input
                                                                placeholder="Nama Permission"
                                                                value={permission.name}
                                                                onChange={(e) => setPermission({ ...permission, name: e.target.value })}
                                                            />
                                                        </Field.Root>
                                                    )}
                                                </Stack>
                                            </Dialog.Body>
                                            <Dialog.Footer>
                                                <Dialog.ActionTrigger asChild>
                                                    <Button variant="surface" color="black">
                                                        Cancel
                                                    </Button>
                                                </Dialog.ActionTrigger>
                                                <Button
                                                    color={modal === 'create' ? 'green' : modal === 'edit' ? 'blue' : 'red'}
                                                    variant="surface"
                                                    loading={processing}
                                                    onClick={submit}
                                                >
                                                    {modal === 'create' ? 'Create' : modal === 'edit' ? 'Update' : 'Delete'}
                                                </Button>
                                            </Dialog.Footer>
                                        </Dialog.Content>
                                    </Dialog.Positioner>
                                </Portal>
                            </Dialog.Root>
                        </Box>

                        <Box overflowX="auto">
                            <Table.Root variant={'outline'} colorScheme="teal">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>No</Table.ColumnHeader>
                                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                                        {/* <Table.ColumnHeader>Guard Name</Table.ColumnHeader> */}
                                        <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {permissions.data.map((permission, index) => (
                                        <Table.Row key={permission.id}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{permission.name}</Table.Cell>
                                            {/* <Table.Cell>{permission.guard_name}</Table.Cell> */}
                                            <Table.Cell textAlign="end">
                                                {/* <Dialog.Trigger asChild> */}
                                                <Button
                                                    onClick={() => {
                                                        setPermission({
                                                            id: permission.id,
                                                            name: permission.name,
                                                            guard_name: permission.guard_name,
                                                        });
                                                        setModal('edit');
                                                        setOpen(true);
                                                    }}
                                                    size="sm"
                                                    color={'blue'}
                                                    variant="surface"
                                                    mr={2}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setPermission({
                                                            id: permission.id,
                                                            name: permission.name,
                                                            guard_name: permission.guard_name,
                                                        });
                                                        setModal('delete');
                                                        setOpen(true);
                                                    }}
                                                    size="sm"
                                                    color={'red'}
                                                    variant="surface"
                                                >
                                                    Delete
                                                </Button>
                                                {/* </Dialog.Trigger> */}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Box>
                        <Center>
                            <Pagination.Root
                                count={permissions.total}
                                pageSize={Number(permissions.per_page)}
                                page={Number(permissions.current_page)}
                                onPageChange={(page) => {
                                    // pagination.setPage(page);
                                    router.reload({ only: ['permissions'], data: { page: page.page } });
                                    console.log('page', page.page);
                                }}
                                siblingCount={2}
                            >
                                <ButtonGroup variant="ghost" size="sm">
                                    <Pagination.PrevTrigger asChild>
                                        <IconButton>
                                            <LuChevronLeft />
                                        </IconButton>
                                    </Pagination.PrevTrigger>

                                    <Pagination.Items
                                        render={(page) => <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>{page.value}</IconButton>}
                                    />

                                    <Pagination.NextTrigger asChild>
                                        <IconButton>
                                            <LuChevronRight />
                                        </IconButton>
                                    </Pagination.NextTrigger>
                                </ButtonGroup>
                            </Pagination.Root>
                        </Center>
                    </Grid>
                </Flex>
            </AppLayout>
        );
    };
