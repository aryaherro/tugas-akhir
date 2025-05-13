import { toaster, Toaster } from '@/components/ui/toaster';
import AppLayout from '@/layouts/app-layout';
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    createListCollection,
    Dialog,
    Field,
    Flex,
    For,
    Grid,
    IconButton,
    Input,
    List,
    Pagination,
    Portal,
    Select,
    Stack,
    Table,
} from '@chakra-ui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

type PermissionType = {
    id: number;
    name: string;
};

type RoleType = {
    id: number | undefined;
    name: string;
    guard_name: string;
    permissions: PermissionType[] | undefined;
};

export default () =>
    // { children }: { children: React.ReactNode }
    {
        type RoleResponse = {
            currentPage: number;
            perPage: number;
            total: number;
            data: RoleType[];
            [key: string]: unknown;
            // Add other properties like meta, links if needed
        };

        const { roles, filters } = usePage<{ roles: RoleResponse; filters: any }>().props;
        const { permissions } = usePage<{ permissions: PermissionType[] }>().props;
        const [open, setOpen] = useState(false);
        const [modal, setModal] = useState('create' as 'create' | 'edit' | 'delete');

        const {
            data: role,
            setData: setRole,
            reset,
            processing,
            errors,
        } = useForm<RoleType>({
            id: undefined,
            name: '',
            guard_name: 'web',
            permissions: undefined,
        });
        const [selectedOption, setSelectedOption] = useState<number[]>([]);

        const handleSelectChange = (e: any) => {
            setRole({
                ...role,
                permissions: e.items.map((item: any) => ({ id: Number(item.value), name: item.label }) as PermissionType),
            });
            setSelectedOption(e.value);
        };

        const submit: FormEventHandler = (e) => {
            e.preventDefault();
            if (modal === 'create') {
                router.post(
                    route('roles.store'),
                    {
                        name: role.name,
                        guard_name: role.guard_name,
                        permissions: role.permissions,
                    },
                    {
                        onSuccess: () => {
                            reset();
                            setOpen(false);
                            toaster.create({
                                title: 'Role created',
                                type: 'success',
                            });
                        },
                    },
                );
            } else if (modal === 'edit') {
                if (role.id !== null) {
                    router.put(
                        route('roles.update', { id: role.id }),
                        {
                            name: role.name,
                            guard_name: role.guard_name,
                            permissions: role.permissions,
                        },
                        {
                            onSuccess: () => {
                                reset();
                                setOpen(false);
                                toaster.create({
                                    title: 'Role updated',
                                    type: 'success',
                                });
                            },
                        },
                    );
                }
            } else if (modal === 'delete') {
                if (role.id !== null) {
                    router.delete(route('roles.destroy', { id: role.id }), {
                        onSuccess: () => {
                            reset();
                            setOpen(false);
                            toaster.create({
                                title: 'Role deleted',
                                type: 'error',
                            });
                        },
                    });
                }
            }
            reset();
            setOpen(false);
        };

        const contentRef = useRef<HTMLDivElement>(null);
        return (
            <AppLayout>
                <Head title="Roles Management" />
                <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                    <Grid gridAutoRows="min-content" gap="4" md={{ gridColumn: '3' }}>
                        <Toaster />

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
                                        Buat Role
                                    </Button>
                                </Dialog.Trigger>
                                <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content ref={contentRef}>
                                            <Dialog.Header>
                                                <Dialog.Title>
                                                    {modal === 'create' ? 'Buat Role' : modal === 'edit' ? 'Edit Role' : 'Delete Role'}
                                                </Dialog.Title>
                                            </Dialog.Header>
                                            <Dialog.Body pb="4">
                                                <Stack gap="4">
                                                    {modal === 'delete' ? (
                                                        <Dialog.Description>
                                                            Apakah anda yakin ingin menghapus role <strong>{role.name}</strong>?
                                                        </Dialog.Description>
                                                    ) : (
                                                        <>
                                                            <Field.Root>
                                                                <Field.Label>Nama Role</Field.Label>
                                                                <Input
                                                                    placeholder="Nama Role"
                                                                    value={role.name}
                                                                    onChange={(e) => setRole({ ...role, name: e.target.value })}
                                                                />
                                                            </Field.Root>
                                                            <Field.Root>
                                                                <Field.Label>Permission</Field.Label>
                                                                <Select.Root
                                                                    multiple
                                                                    closeOnSelect
                                                                    collection={createListCollection({
                                                                        items: permissions.map((item) => ({
                                                                            label: item.name,
                                                                            value: item.id,
                                                                        })),
                                                                    })}
                                                                    onValueChange={handleSelectChange}
                                                                    value={selectedOption}
                                                                >
                                                                    <Select.HiddenSelect />
                                                                    <Select.Label>Select Permission</Select.Label>
                                                                    <Select.Control>
                                                                        <Select.Trigger>
                                                                            <Select.ValueText placeholder="Select Permission" />
                                                                        </Select.Trigger>
                                                                        <Select.IndicatorGroup>
                                                                            <Select.ClearTrigger />
                                                                            <Select.Indicator />
                                                                        </Select.IndicatorGroup>
                                                                    </Select.Control>
                                                                    <Portal container={contentRef}>
                                                                        <Select.Positioner>
                                                                            <Select.Content maxHeight="300px" overflowY="auto">
                                                                                {createListCollection({
                                                                                    items: permissions.map((item) => ({
                                                                                        label: item.name,
                                                                                        value: item.id,
                                                                                    })),
                                                                                }).items.map((permission) => (
                                                                                    <Select.Item item={permission} key={permission.value}>
                                                                                        {permission.label}
                                                                                        <Select.ItemIndicator />
                                                                                    </Select.Item>
                                                                                ))}
                                                                            </Select.Content>
                                                                        </Select.Positioner>
                                                                    </Portal>
                                                                </Select.Root>
                                                            </Field.Root>
                                                        </>
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
                                        <Table.ColumnHeader>Permissions</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {roles.data.map((roleMap, index) => (
                                        <Table.Row key={roleMap.id}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{roleMap.name}</Table.Cell>
                                            <Table.Cell>
                                                <List.Root as="ol">
                                                    <For each={roleMap.permissions ?? []} fallback={<Box color="fg.muted">No permissions</Box>}>
                                                        {(item) => <List.Item key={item.id}>{item.name}</List.Item>}
                                                    </For>
                                                </List.Root>
                                            </Table.Cell>
                                            <Table.Cell textAlign="end">
                                                {/* <Dialog.Trigger asChild> */}
                                                <Button
                                                    onClick={() => {
                                                        setRole(roleMap);

                                                        setSelectedOption(roleMap.permissions?.map((item) => item.id) ?? []);
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
                                                        setRole(roleMap);
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
                                count={roles.total}
                                pageSize={Number(roles.per_page)}
                                page={Number(roles.current_page)}
                                onPageChange={(page) => {
                                    // pagination.setPage(page);
                                    router.reload({ only: ['roles'], data: { page: page.page } });
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
