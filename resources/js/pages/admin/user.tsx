import { PasswordInput } from '@/components/ui/password-input';
import { toaster, Toaster } from '@/components/ui/toaster';
import AppLayout from '@/layouts/app-layout';
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Checkbox,
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
    Show,
    Stack,
    Table,
} from '@chakra-ui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface RoleType {
    id: number;
    name: string;
    guard_name: string;
}

interface UserType {
    id: number | undefined;
    name: string;
    email: string;
    password: string;
    roles: RoleType[] | undefined;
    [key: string]: any;
}

export default () => {
    type UserResponse = {
        currentPage: number;
        perPage: number;
        total: number;
        data: UserType[];
        [key: string]: unknown;
        // Add other properties like meta, links if needed
    };

    const { users, filters } = usePage<{ users: UserResponse; filters: any }>().props;
    const { roles } = usePage<{ roles: RoleType[] }>().props;
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState('create' as 'create' | 'edit' | 'delete');
    const [checked, setChecked] = useState(false);

    const {
        data: user,
        setData: setUser,
        reset,
        processing,
        errors,
    } = useForm<UserType>({
        id: undefined,
        name: '',
        email: '',
        password: '',
        roles: undefined,
    });
    const [selectedOption, setSelectedOption] = useState<number[]>([]);

    const handleSelectChange = (e: any) => {
        setUser({ ...user, roles: e.value });
        setSelectedOption(e.value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (modal === 'create') {
            router.post(
                route('users.store'),
                {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password,
                    roles: (user.roles ?? []).map((role: any) => (typeof role === 'object' ? role.id : role)),
                },
                {
                    onSuccess: () => {
                        reset();
                        setOpen(false);
                        toaster.create({
                            title: 'User created',
                            type: 'success',
                        });
                    },
                    onError: (e) => {
                        toaster.create({
                            title: 'User created failed',
                            type: 'error',
                        });
                    },
                },
            );
        } else if (modal === 'edit') {
            if (user.id !== null) {
                router.put(
                    route('users.update', { id: user.id }),
                    {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        password_confirmation: user.password,
                        roles: (user.roles ?? []).map((role: any) => (typeof role === 'object' ? role.id : role)),
                    },
                    {
                        onSuccess: () => {
                            reset();
                            setOpen(false);
                            toaster.create({
                                title: 'User updated',
                                type: 'success',
                            });
                        },
                        onError: (e) => {
                            toaster.create({
                                title: 'User update failed',
                                type: 'error',
                            });
                        },
                    },
                );
            }
        } else if (modal === 'delete') {
            if (user.id !== null) {
                router.delete(route('users.destroy', { id: user.id }), {
                    onSuccess: () => {
                        reset();
                        setOpen(false);
                        toaster.create({
                            title: 'User deleted',
                            type: 'error',
                        });
                    },
                    onError: () => {
                        toaster.create({
                            title: 'User delete failed',
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
            <Head title="User Management" />
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
                                    Buat User
                                </Button>
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content ref={contentRef}>
                                        <Dialog.Header>
                                            <Dialog.Title>
                                                {modal === 'create' ? 'Buat User' : modal === 'edit' ? 'Edit User' : 'Delete User'}
                                            </Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body pb="4">
                                            <Stack gap="4">
                                                {modal === 'delete' ? (
                                                    <Dialog.Description>
                                                        Apakah anda yakin ingin menghapus user <strong>{user.name}</strong>?
                                                    </Dialog.Description>
                                                ) : (
                                                    <>
                                                        <Field.Root>
                                                            <Field.Label htmlFor="name">Nama User</Field.Label>
                                                            <Input
                                                                id="name"
                                                                autoComplete="name"
                                                                placeholder="Nama User"
                                                                value={user.name}
                                                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                            />
                                                        </Field.Root>
                                                        <Field.Root>
                                                            <Field.Label htmlFor="email">Email User</Field.Label>
                                                            <Input
                                                                id="email"
                                                                autoComplete="email"
                                                                placeholder="Email User"
                                                                value={user.email}
                                                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                            />
                                                        </Field.Root>
                                                        <Field.Root>
                                                            <Show when={modal === 'edit'}>
                                                                <Checkbox.Root
                                                                    checked={checked}
                                                                    onCheckedChange={(e) => {
                                                                        setChecked(!!e.checked);
                                                                        setUser({ ...user, password: '' });
                                                                    }}
                                                                >
                                                                    <Checkbox.HiddenInput id="checked" />
                                                                    <Checkbox.Control />
                                                                    <Checkbox.Label>Ubah Password</Checkbox.Label>
                                                                </Checkbox.Root>
                                                            </Show>
                                                            <Show when={checked || modal === 'create'}>
                                                                <Field.Label htmlFor="password">Password User</Field.Label>
                                                                <PasswordInput
                                                                    id="password"
                                                                    type="password"
                                                                    required
                                                                    tabIndex={3}
                                                                    autoComplete="new-password"
                                                                    value={user.password}
                                                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                                                    disabled={processing}
                                                                    placeholder="Password"
                                                                />
                                                                <Field.RequiredIndicator />
                                                            </Show>
                                                        </Field.Root>
                                                        <Field.Root>
                                                            {/* <Field.Label for="roles">Roles</Field.Label> */}
                                                            <Select.Root
                                                                id="roles"
                                                                multiple
                                                                closeOnSelect
                                                                collection={createListCollection({
                                                                    items: roles.map((item) => ({
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
                                                                                items: roles.map((item) => ({
                                                                                    label: item.name,
                                                                                    value: item.id,
                                                                                })),
                                                                            }).items.map((role) => (
                                                                                <Select.Item item={role} key={role.value}>
                                                                                    {role.label}
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
                                {users.data.map((userMap, index) => (
                                    <Table.Row key={userMap.id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{userMap.name}</Table.Cell>
                                        <Table.Cell>
                                            <List.Root as="ol">
                                                <For each={userMap.roles ?? []} fallback={<Box color="fg.muted">No roles</Box>}>
                                                    {(item) => <List.Item key={item.id}>{item.name}</List.Item>}
                                                </For>
                                            </List.Root>
                                        </Table.Cell>
                                        <Table.Cell textAlign="end">
                                            {/* <Dialog.Trigger asChild> */}
                                            <Button
                                                onClick={() => {
                                                    setUser(userMap);
                                                    setSelectedOption(userMap.roles?.map((role) => role.id) ?? []);
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
                                                    setUser(userMap);
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
                            count={users.total}
                            pageSize={Number(users.per_page)}
                            page={Number(users.current_page)}
                            onPageChange={(page) => {
                                // pagination.setPage(page);
                                router.reload({ only: ['users'], data: { page: page.page } });
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
