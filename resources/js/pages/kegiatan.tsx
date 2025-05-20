import { SingleDatePickerPopup } from '@/components/DatePicker';
import { DatePickerStyleConfig, defaultDatePickerStyle } from '@/components/DatePicker/type';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/layouts/app-layout';
import { hasRole } from '@/lib/utils';
import { SharedData } from '@/types';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, IconButton, Input, Pagination, Table, Text, useDisclosure } from '@chakra-ui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

//penjamin_biaya, status_permintaan, unit, tipe_permintaan
type StandarType={
    id: number;
    nama: string;
};

type UserType={
    id: number;
    name: string;
    email: string;
};

type MobilType={
    id: number;
    nama: string;
    plat_nomor: string;
};

type PasienType={
    id: number;
    nama: string;
    no_rm: number;
};

type TriaseType={
    id: number;
    warna: string;
    keterangan: string;
};

type PermintaanType={
    id: null;
    tanggal: Date|null;
    tipe_permintaan: StandarType;
    pasien: PasienType;
    triase: TriaseType;
    penjamin_biaya: StandarType;
    mobil: MobilType;
    unit: StandarType;
    creator: UserType|null;
    tujuan: string;
    kilometer: number|null;
    status_permintaan: StandarType;
    driver: UserType|null;
    jam_berangkat: string|null;
    jam_kembali: string|null;
    kilometer_terakhir: number|null;
    biaya: number|null;
};

export default () =>
// { children }: { children: React.ReactNode }
{
    const page=usePage<SharedData>();
    const { auth }=page.props;

    const pickerDisclosure=useDisclosure();
    const pickerFilterDisclosure=useDisclosure();
    const [popupSelectedDate, setPopupSelectedDate]=useState(new Date());
    const [popupFilterDate, setPopupFilterDate]=useState(new Date());
    const [datePickerStyle, setDatePickerStyle]=useState<DatePickerStyleConfig>(defaultDatePickerStyle);
    const [pickerFilterStringDate, setPickerFilterStringDate]=useState<string|null>(null);

    type PermintaanResponse={
        currentPage: number;
        perPage: number;
        total: number;
        data: PermintaanType[];
        [key: string]: unknown;
        // Add other properties like meta, links if needed
    };

    const { permintaans, filters }=usePage<{ permintaans: PermintaanResponse; filters: any }>().props;
    // const { permissions } = usePage<{ permissions: PermissionType[] }>().props;
    const [open, setOpen]=useState(false);
    const [modal, setModal]=useState('');

    const {
        data: permintaan,
        setData: setPermintaan,
        reset,
        processing,
    }=useForm<PermintaanType>({
        id: null,
        tanggal: null,
        tipe_permintaan: { id: 0, nama: '' },
        pasien: { id: 0, nama: '', no_rm: 0 },
        triase: { id: 0, warna: '', keterangan: '' },
        penjamin_biaya: { id: 0, nama: '' },
        mobil: { id: 0, nama: '', plat_nomor: '' },
        unit: { id: 0, nama: '' },
        creator: auth.user,
        tujuan: '',
        kilometer: null,
        status_permintaan: { id: 0, nama: '' },
        driver: null,
        jam_berangkat: null,
        jam_kembali: null,
        kilometer_terakhir: null,
        biaya: 0,
    });
    const [selectedOption, setSelectedOption]=useState<
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

    const contentRef=useRef<HTMLDivElement>(null);

    const handleSetFilterDate=(date: Date) => {
        setPopupFilterDate(date);
        const $year=date.getFullYear();
        const $month=date.getMonth()+1;
        const $day=date.getDate()+1;
        const $tanggalString=new Date($year, $month-1, $day);
        setPickerFilterStringDate($tanggalString.toISOString().substring(0, 10));
        router.reload({
            only: ['permintaans'],
            data: {
                tanggal: $tanggalString.toISOString().substring(0, 10),
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Kegiatan" />
            <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                <Grid gridAutoRows="min-content" gap="4" md={{ gridColumn: '3' }}>
                    <Toaster />
                    <Text fontSize="2xl" fontWeight="bold">
                        Permintaan Layanan
                    </Text>
                    <Box display="flex" justifyContent="space-Between" alignItems="center">
                        <HStack>
                            <SingleDatePickerPopup
                                isOpen={pickerFilterDisclosure.open}
                                onClose={pickerFilterDisclosure.onClose}
                                onOpen={pickerFilterDisclosure.onOpen}
                                selectedDate={popupFilterDate}
                                onSetDate={handleSetFilterDate}
                                datePickerStyle={datePickerStyle}
                            >
                                <Input
                                    value={popupFilterDate.toLocaleDateString('id-ID')}
                                    onClick={pickerFilterDisclosure.onOpen}
                                    readOnly
                                    placeholder="Pilih Tanggal"
                                />
                            </SingleDatePickerPopup>
                            <Button
                                variant="surface"
                                color="red"
                                onClick={() => {
                                    setPopupFilterDate(new Date());
                                    router.visit(route('permintaan-layanan.index'), {
                                        only: ['permintaans'],
                                    });
                                }}
                            >
                                Reset
                            </Button>
                        </HStack>
                    </Box>

                    <Box overflowX="auto">
                        <Table.Root variant={'outline'} colorScheme="teal" showColumnBorder>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader>No</Table.ColumnHeader>
                                    <Table.ColumnHeader>Tanggal</Table.ColumnHeader>
                                    <Table.ColumnHeader>Tipe Permintaan</Table.ColumnHeader>
                                    <Table.ColumnHeader>Mobil</Table.ColumnHeader>
                                    {hasRole('admin')&&(
                                        <>
                                            <Table.ColumnHeader>Unit</Table.ColumnHeader>
                                            <Table.ColumnHeader>Creator</Table.ColumnHeader>
                                        </>
                                    )}
                                    <Table.ColumnHeader>Tujuan</Table.ColumnHeader>
                                    <Table.ColumnHeader>KM</Table.ColumnHeader>
                                    <Table.ColumnHeader>Status Permintaan</Table.ColumnHeader>
                                    <Table.ColumnHeader>Driver</Table.ColumnHeader>
                                    {(hasRole('admin')||hasRole('driver'))&&(
                                        <>
                                            <Table.ColumnHeader>Jam Berangkat</Table.ColumnHeader>
                                            <Table.ColumnHeader>Jam Kembali</Table.ColumnHeader>
                                            {/* <Table.ColumnHeader>KM Terakhir</Table.ColumnHeader> */}
                                        </>
                                    )}

                                    <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {permintaans.data.length>0? (
                                    permintaans.data.map((permintaanMap, index) => (
                                        <Table.Row key={permintaanMap.id}>
                                            <Table.Cell>{index+1}</Table.Cell>
                                            <Table.Cell>
                                                {permintaanMap.tanggal? new Date(permintaanMap.tanggal).toLocaleDateString('id-ID'):'-'}
                                            </Table.Cell>
                                            <Table.Cell>{permintaanMap.tipe_permintaan.nama}</Table.Cell>
                                            <Table.Cell>{permintaanMap.mobil?.nama}</Table.Cell>
                                            {hasRole('admin')&&(
                                                <>
                                                    <Table.Cell>{permintaanMap.unit.nama}</Table.Cell>
                                                    <Table.Cell>{permintaanMap.creator?.name}</Table.Cell>
                                                </>
                                            )}
                                            <Table.Cell>{permintaanMap.tujuan}</Table.Cell>
                                            <Table.Cell>{permintaanMap.kilometer}</Table.Cell>
                                            <Table.Cell>{permintaanMap.status_permintaan.nama}</Table.Cell>
                                            <Table.Cell>{permintaanMap.driver?.name}</Table.Cell>
                                            <Table.Cell>{permintaanMap.jam_berangkat}</Table.Cell>
                                            <Table.Cell>{permintaanMap.jam_kembali}</Table.Cell>
                                            {/* <Table.Cell>{permintaanMap.kilometer_terakhir}</Table.Cell> */}
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
                                ):(
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
