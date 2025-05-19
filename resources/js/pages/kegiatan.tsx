import { SingleDatePickerPopup } from '@/components/DatePicker';
import { DatePickerStyleConfig, defaultDatePickerStyle } from '@/components/DatePicker/type';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/layouts/app-layout';
import { hasRole } from '@/lib/utils';
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Dialog,
    Field,
    Flex,
    Grid,
    IconButton,
    Input,
    Pagination,
    Portal,
    Stack,
    Table,
    useDisclosure,
} from '@chakra-ui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Select } from 'chakra-react-select';
import { useRef, useState } from 'react';
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
        // const page = usePage<SharedData>();
        // const { auth } = page.props;
        const pickerDisclosure = useDisclosure();
        const [popupSelectedDate, setPopupSelectedDate] = useState(new Date());
        const [datePickerStyle, setDatePickerStyle] = useState<DatePickerStyleConfig>(defaultDatePickerStyle);
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
            creator: { id: 0, name: '', email: '' },
            tujuan: '',
            kilometer: 0,
            status_permintaan: { id: 0, name: '' },
            driver: null,
            jam_berangkat: null,
            jam_kembali: null,
            kilometer_terakhir: null,
        });
        const [selectedOption, setSelectedOption] = useState<
            {
                label: string;
                value: number;
            }[]
        >([]);

        // const handleSelectChange = (e: any) => {
        //     setRole({
        //         ...role,
        //         permissions: e.map((item: { value: number; label: string }) => ({
        //             id: item.value,
        //             name: item.label,
        //         })),
        //     });
        //     setSelectedOption(e);
        // };

        // const submit: FormEventHandler = (e) => {
        //     e.preventDefault();
        //     if (modal === 'create') {
        //         router.post(
        //             route('roles.store'),
        //             {
        //                 name: role.name,
        //                 guard_name: role.guard_name,
        //                 permissions: role.permissions,
        //             },
        //             {
        //                 onSuccess: () => {
        //                     reset();
        //                     setOpen(false);
        //                     toaster.create({
        //                         title: 'Role created',
        //                         type: 'success',
        //                     });
        //                 },
        //             },
        //         );
        //     } else if (modal === 'edit') {
        //         if (role.id !== null) {
        //             router.put(
        //                 route('roles.update', { id: role.id }),
        //                 {
        //                     name: role.name,
        //                     guard_name: role.guard_name,
        //                     permissions: role.permissions,
        //                 },
        //                 {
        //                     onSuccess: () => {
        //                         reset();
        //                         setOpen(false);
        //                         toaster.create({
        //                             title: 'Role updated',
        //                             type: 'success',
        //                         });
        //                     },
        //                 },
        //             );
        //         }
        //     } else if (modal === 'delete') {
        //         if (role.id !== null) {
        //             router.delete(route('roles.destroy', { id: role.id }), {
        //                 onSuccess: () => {
        //                     reset();
        //                     setOpen(false);
        //                     toaster.create({
        //                         title: 'Role deleted',
        //                         type: 'error',
        //                     });
        //                 },
        //             });
        //         }
        //     }
        //     reset();
        //     setOpen(false);
        // };

        const contentRef = useRef<HTMLDivElement>(null);
        return (
            <AppLayout>
                <Head title="Kegiatan" />
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
                                        Buat Permintaan
                                    </Button>
                                </Dialog.Trigger>
                                <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content ref={contentRef}>
                                            <Dialog.Header>
                                                <Dialog.Title>
                                                    {modal === 'create'
                                                        ? 'Buat Permintaan'
                                                        : modal === 'edit'
                                                          ? 'Edit Permintaan'
                                                          : 'Delete Permintaan'}
                                                </Dialog.Title>
                                            </Dialog.Header>
                                            <Dialog.Body pb="4">
                                                <Stack gap="4">
                                                    {modal === 'delete' ? (
                                                        <Dialog.Description>
                                                            Apakah anda yakin ingin menghapus permintaan <strong>{permintaan.unit.name}</strong>?
                                                        </Dialog.Description>
                                                    ) : (
                                                        <>
                                                            <Field.Root>
                                                                <Field.Label>Tanggal</Field.Label>
                                                                <SingleDatePickerPopup
                                                                    isOpen={pickerDisclosure.open}
                                                                    onClose={pickerDisclosure.onClose}
                                                                    onOpen={pickerDisclosure.onOpen}
                                                                    selectedDate={popupSelectedDate}
                                                                    onSetDate={setPopupSelectedDate}
                                                                    datePickerStyle={datePickerStyle}
                                                                >
                                                                    <Input
                                                                        value={popupSelectedDate.toLocaleDateString('id-ID')}
                                                                        onClick={pickerDisclosure.onOpen}
                                                                        readOnly
                                                                        placeholder="Pilih Tanggal"
                                                                    />
                                                                    {/* <Button>{format(popupSelectedDate, 'dd/MM/yyyy')}</Button> */}
                                                                </SingleDatePickerPopup>
                                                            </Field.Root>
                                                            <Field.Root>
                                                                <Field.Label>Permission</Field.Label>
                                                                <Select
                                                                    isMulti
                                                                    // options={permissions.map((item) => ({
                                                                    //     label: item.name,
                                                                    //     value: item.id,
                                                                    // }))}
                                                                    // onChange={handleSelectChange}
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
                                                    // onClick={submit}
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
                            <Table.Root variant={'outline'} colorScheme="teal" showColumnBorder>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>No</Table.ColumnHeader>
                                        <Table.ColumnHeader>Tanggal</Table.ColumnHeader>
                                        <Table.ColumnHeader>Tipe Permintaan</Table.ColumnHeader>
                                        <Table.ColumnHeader>Mobil</Table.ColumnHeader>
                                        {hasRole('admin') && (
                                            <>
                                                <Table.ColumnHeader>Unit</Table.ColumnHeader>
                                                <Table.ColumnHeader>Creator</Table.ColumnHeader>
                                            </>
                                        )}
                                        <Table.ColumnHeader>Tujuan</Table.ColumnHeader>
                                        <Table.ColumnHeader>KM</Table.ColumnHeader>
                                        <Table.ColumnHeader>Status Permintaan</Table.ColumnHeader>
                                        <Table.ColumnHeader>Driver</Table.ColumnHeader>
                                        {(hasRole('admin') || hasRole('driver')) && (
                                            <>
                                                <Table.ColumnHeader>Jam Berangkat</Table.ColumnHeader>
                                                <Table.ColumnHeader>Jam Kembali</Table.ColumnHeader>
                                                <Table.ColumnHeader>KM Terakhir</Table.ColumnHeader>
                                            </>
                                        )}

                                        <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {permintaans.data.length > 0 ? (
                                        permintaans.data.map((permintaanMap, index) => (
                                            <Table.Row key={permintaanMap.id}>
                                                <Table.Cell>{index + 1}</Table.Cell>
                                                <Table.Cell>{new Date(permintaanMap.tanggal).toLocaleDateString('id-ID')}</Table.Cell>
                                                <Table.Cell>{permintaanMap.tipe_permintaan.name}</Table.Cell>
                                                <Table.Cell>{permintaanMap.mobil.nama}</Table.Cell>
                                                {hasRole('admin') && (
                                                    <>
                                                        <Table.Cell>{permintaanMap.unit.name}</Table.Cell>
                                                        <Table.Cell>{permintaanMap.creator?.name}</Table.Cell>
                                                    </>
                                                )}
                                                <Table.Cell>{permintaanMap.tujuan}</Table.Cell>
                                                <Table.Cell>{permintaanMap.kilometer}</Table.Cell>
                                                <Table.Cell>{permintaanMap.status_permintaan.name}</Table.Cell>
                                                <Table.Cell>{permintaanMap.driver?.name}</Table.Cell>
                                                <Table.Cell>{permintaanMap.jam_berangkat}</Table.Cell>
                                                <Table.Cell>{permintaanMap.jam_kembali}</Table.Cell>
                                                <Table.Cell>{permintaanMap.kilometer_terakhir}</Table.Cell>
                                                <Table.Cell textAlign="end">
                                                    <Button
                                                        onClick={() => {
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
                                                            setModal('delete');
                                                            setOpen(true);
                                                        }}
                                                        size="sm"
                                                        color={'red'}
                                                        variant="surface"
                                                    >
                                                        Delete
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    ) : (
                                        <Table.Row alignContent={'center'}>
                                            <Table.Cell textAlign="center">
                                                <p>Data tidak ditemukan</p>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table.Root>
                        </Box>
                        <Center>
                            <Pagination.Root
                                count={permintaans.total}
                                pageSize={Number(permintaans.per_page)}
                                page={Number(permintaans.current_page)}
                                onPageChange={(page) => {
                                    // pagination.setPage(page);
                                    router.reload({ only: ['permintaans'], data: { page: page.page } });
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
