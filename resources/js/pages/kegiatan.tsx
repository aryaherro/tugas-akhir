import { toaster, Toaster } from '@/components/ui/toaster';
import AppLayout from '@/layouts/app-layout';
import {
    Box,
    Button,
    ButtonGroup,
    Center,
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
    Stack,
    Table,
} from '@chakra-ui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Select } from 'chakra-react-select';
import { FormEventHandler, useRef, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

type UnitType = {
    id: number;
    name: string;
};

type UserType = {
    id: number;
    name: string;
    email: string;
};

type MobilType = {
    id: number;
    nama: string;
    plat_nomor: string;
};

type TipePermintaanType = {
    id: number;
    name: string;
};

type StatusPermintaanType = {
    id: number;
    name: string;
};

type PermintaanType = {
    id: number | null;
    tanggal: Date;
    tipe_permintaan: TipePermintaanType;
    mobil: MobilType;
    unit: UnitType;
    creator: UserType | null;
    tujuan: string;
    kilometer: number;
    status_permintaan: StatusPermintaanType;
    driver: UserType | null;
    jam_berangkat: string | null;
    jam_kembali: string | null;
    kilometer_terakhir: number | null;
};

export default () =>
    // { children }: { children: React.ReactNode }
    {
        type PermintaanResponse = {
            currentPage: number;
            perPage: number;
            total: number;
            data: PermintaanType[];
            [key: string]: unknown;
            // Add other properties like meta, links if needed
        };

        const { permintaans, filters } = usePage<{ permintaans: PermintaanResponse; filters: any }>().props;
        // const { permissions } = usePage<{ permissions: PermissionType[] }>().props;
        const [open, setOpen] = useState(false);
        const [modal, setModal] = useState('');

        const {
            data: permintaan,
            setData: setPermintaan,
            reset,
            processing,
        } = useForm<PermintaanType>({
            id: null,
            tanggal: new Date(),
            tipe_permintaan: { id: 0, name: '' },
            mobil: { id: 0, nama: '', plat_nomor: '' },
            unit: { id: 0, name: '' },
            creator: { id: 0, name: '', email: '', unit: null },
            tujuan: '',
            kilometer: 0,
            status_permintaan: { id: 0, name: '' },
            driver: { id: 0, name: '', email: '', unit: null },
            jam_berangkat: '',
            jam_kembali: '',
            kilometer_terakhir: 0,
        });
        const [selectedOption, setSelectedOption] = useState<
            {
                label: string;
                value: number;
            }[]
        >([]);

        const handleSelectChange = (e: any) => {
            setRole({
                ...role,
                permissions: e.map((item: { value: number; label: string }) => ({
                    id: item.value,
                    name: item.label,
                })),
            });
            setSelectedOption(e);
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
                                onExitComplete={() => {
                                    reset();
                                    setSelectedOption([]);
                                }}
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
                                                                <Select
                                                                    isMulti
                                                                    options={permissions.map((item) => ({
                                                                        label: item.name,
                                                                        value: item.id,
                                                                    }))}
                                                                    onChange={handleSelectChange}
                                                                    value={selectedOption}
                                                                    placeholder="Select Permission"
                                                                />
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

                                                        setSelectedOption(
                                                            roleMap.permissions?.map((item) => ({
                                                                label: item.name,
                                                                value: item.id,
                                                            })) ?? [],
                                                        );
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
