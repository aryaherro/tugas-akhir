import { toaster, Toaster } from '@/components/ui/toaster';
import { useFilteredData } from '@/hooks/useFilteredData';
import { useSortedData } from '@/hooks/useSortedData';
import AppLayout from '@/layouts/app-layout';
import { ExportToCSV, ExportToExcel, ExportToPDF } from '@/lib/exporters';
import { Box, Button, Dialog, Flex, Grid, HStack, Input, InputGroup, Portal, Stack, Table, Text } from '@chakra-ui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Select } from 'chakra-react-select';
import { FormEventHandler, useCallback, useState } from 'react';

const getNestedValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc?.[part], obj);

//penjamin_biaya, status_permintaan, unit, tipe_permintaan
type StandarType = {
    id: number;
    nama: string;
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

type PasienType = {
    id: number;
    nama: string;
    no_rm: number;
};

type TriaseType = {
    id: number;
    warna: string;
    keterangan: string;
};

type PermintaanType = {
    id: number | null;
    tanggal: Date | null;
    tipe_permintaan: StandarType;
    pasien: PasienType;
    triase: TriaseType;
    penjamin_biaya: StandarType;
    unit: StandarType;
    creator: UserType | null;
    tujuan: string;
    kilometer: number | null;
    status_permintaan: StandarType;
    mobil: MobilType;
    driver: UserType | null;
    jam_berangkat: string | null;
    jam_kembali: string | null;
    kilometer_terakhir: number | null;
    biaya: number | null;
};

const exportColumns = [
    'No',
    'Tanggal',
    'Tipe Permintaan',
    'Pasien',
    'Triase',
    'Penjamin Biaya',
    'Unit',
    'Creator',
    'Tujuan',
    'Kilometer',
    'Status Permintaan',
    'Mobil',
    'Driver',
    'Jam Berangkat',
    'Jam Kembali',
    'Kilometer Terakhir',
    'Biaya',
];

export default () => {
    const initialData = usePage<{ permintaans: PermintaanType[] }>().props.permintaans;

    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterValue, setFilterValue] = useState('');
    const [isExporting, setIsExporting] = useState(false);

    const filteredData = useFilteredData(initialData, filterValue);

    const sortedData = useSortedData(filteredData, sortBy, sortOrder);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const [open, setOpen] = useState(false);

    const formatCurrency = (value: number | null) => (value !== null ? value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'N/A');

    const pageSizeOptions = [
        { value: 5, label: '5 per page' },
        { value: 10, label: '10 per page' },
        { value: 20, label: '20 per page' },
        { value: 50, label: '50 per page' },
        { value: 100, label: '100 per page' },
        { value: filteredData.length, label: 'Show all' },
    ];

    const handleSort = (columnPath: string) => {
        if (sortBy === columnPath) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnPath);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    const getExportData = useCallback(() => {
        return sortedData.map((item, index) => ({
            No: index + 1,
            Tanggal: item.tanggal,
            'Tipe Permintaan': item.tipe_permintaan?.nama || '-',
            Pasien: item.pasien?.nama || '-',
            Triase: item.triase?.warna || '-',
            'Penjamin Biaya': item.penjamin_biaya?.nama || '-',
            Unit: item.unit?.nama || '-',
            Creator: item.creator?.name || '-',
            Tujuan: item.tujuan,
            Kilometer: item.kilometer,
            'Status Permintaan': item.status_permintaan?.nama || '-',
            Mobil: item.mobil?.nama || '-',
            Driver: item.driver?.name || '-',
            'Jam Berangkat': item.jam_berangkat,
            'Jam Kembali': item.jam_kembali,
            'Kilometer Terakhir': item.kilometer_terakhir,
            Biaya: item.biaya?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) || 'N/A',
        }));
    }, [sortedData]);

    const handleExport = useCallback(
        async (type: 'csv' | 'excel' | 'pdf') => {
            setIsExporting(true);
            const exportData = getExportData();
            const filename = 'data-permintaan';
            if (type === 'csv') ExportToCSV(exportData, filename);
            else if (type === 'excel') ExportToExcel(exportData, filename);
            else if (type === 'pdf') ExportToPDF(exportColumns, exportData, filename);
            setIsExporting(false);
        },
        [getExportData],
    );

    const {
        data: permintaan,
        setData: setPermintaan,
        post,
        reset,
        processing,
        errors,
    } = useForm<PermintaanType>({
        id: null,
        tanggal: null,
        tipe_permintaan: { id: 0, nama: '' },
        pasien: { id: 0, nama: '', no_rm: 0 },
        triase: { id: 0, warna: '', keterangan: '' },
        penjamin_biaya: { id: 0, nama: '' },
        unit: { id: 0, nama: '' },
        creator: null,
        tujuan: '',
        kilometer: null,
        status_permintaan: { id: 0, nama: '' },
        mobil: { id: 0, nama: '', plat_nomor: '' },
        driver: null,
        jam_berangkat: null,
        jam_kembali: null,
        kilometer_terakhir: null,
        biaya: null,
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.delete(route('permintaan-layanan.destroy', { id: permintaan.id }), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toaster.create({
                    title: 'Permintaan deleted',
                    type: 'error',
                });
            },
        });
        reset();
        setOpen(false);
    };
    return (
        <AppLayout>
            <Head title="Kegiatan" />
            <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                <Grid gridAutoRows="min-content" gap="4" md={{ gridColumn: '3' }}>
                    <Toaster />
                    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} size="sm" placement="center">
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>Delete Permintaan</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body pb="4">
                                        <Stack gap="4">
                                            <Dialog.Description>
                                                Apakah anda yakin ingin menghapus permintaan{' '}
                                                <strong>
                                                    {permintaan.tanggal
                                                        ? permintaan.tanggal instanceof Date
                                                            ? permintaan.tanggal.toLocaleDateString()
                                                            : String(permintaan.tanggal)
                                                        : 'N/A'}
                                                    {' - '}
                                                    {permintaan.tipe_permintaan.nama} - {permintaan.pasien.nama}
                                                </strong>
                                                ?
                                            </Dialog.Description>
                                        </Stack>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="surface" color="black">
                                                Cancel
                                            </Button>
                                        </Dialog.ActionTrigger>
                                        <Button color={'red'} variant="surface" loading={processing} onClick={submit}>
                                            Delete
                                        </Button>
                                    </Dialog.Footer>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                    <Text fontSize="2xl" fontWeight="bold">
                        Permintaan Layanan
                    </Text>
                    <HStack gap={3} mb={4}>
                        <Button disabled={isExporting} variant="solid" colorPalette="blue" onClick={() => handleExport('csv')}>
                            Export CSV
                        </Button>
                        <Button disabled={isExporting} variant="solid" colorPalette="green" onClick={() => handleExport('excel')}>
                            Export Excel
                        </Button>
                        <Button disabled={isExporting} variant="solid" colorPalette="red" onClick={() => handleExport('pdf')}>
                            Export PDF
                        </Button>
                    </HStack>
                    <Box p={4}>
                        <InputGroup mb={6}>
                            <Input
                                placeholder="Search all columns..."
                                value={filterValue}
                                onChange={(e) => {
                                    setFilterValue(e.target.value);
                                    setCurrentPage(1);
                                }}
                                variant="outline"
                            />
                        </InputGroup>
                        <Table.ScrollArea borderWidth="1px" rounded="md" height="300px" maxW={'breakpoint-lg'}>
                            <Table.Root variant="line" size="md" stickyHeader>
                                <Table.Header bg="gray.100">
                                    <Table.Row>
                                        <Table.ColumnHeader>No</Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('tanggal')}>
                                            Tanggal {sortBy === 'tanggal' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('tipe_permintaan.nama')}>
                                            Tipe Permintaan {sortBy === 'tipe_permintaan.nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('pasien.nama')}>
                                            Pasien {sortBy === 'pasien.nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('triase.warna')}>
                                            Triase {sortBy === 'triase.warna' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('penjamin_biaya.nama')}>
                                            Penjamin Biaya {sortBy === 'penjamin_biaya.nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('unit.nama')}>
                                            Unit {sortBy === 'unit.nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('creator.name')}>
                                            Creator {sortBy === 'creator.name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('tujuan')}>
                                            Tujuan {sortBy === 'tujuan' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('kilometer')}>
                                            Kilometer {sortBy === 'kilometer' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('status_permintaan.nama')}>
                                            Status Permintaan {sortBy === 'status_permintaan.nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('mobil.nama')}>
                                            Mobil {sortBy === 'mobil.nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('driver.name')}>
                                            Driver {sortBy === 'driver.name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('jam_berangkat')}>
                                            Jam Berangkat {sortBy === 'jam_berangkat' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('jam_kembali')}>
                                            Jam Kembali {sortBy === 'jam_kembali' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('kilometer_terakhir')}>
                                            Kilometer Terakhir {sortBy === 'kilometer_terakhir' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('biaya')}>
                                            Biaya {sortBy === 'biaya' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {currentItems.map((item, index) => (
                                        <Table.Row key={item.id} _hover={{ bg: 'gray.50' }}>
                                            <Table.Cell>{indexOfFirstItem + index + 1}</Table.Cell>
                                            <Table.Cell>
                                                {item.tanggal instanceof Date ? item.tanggal.toLocaleDateString() : String(item.tanggal)}
                                            </Table.Cell>
                                            <Table.Cell>{item.tipe_permintaan.nama}</Table.Cell>
                                            <Table.Cell>{item.pasien.nama}</Table.Cell>
                                            <Table.Cell>{item.triase.warna}</Table.Cell>
                                            <Table.Cell>{item.penjamin_biaya.nama}</Table.Cell>
                                            <Table.Cell>{item.unit.nama}</Table.Cell>
                                            <Table.Cell>{item.creator ? item.creator.name : 'N/A'}</Table.Cell>
                                            <Table.Cell>{item.tujuan}</Table.Cell>
                                            <Table.Cell>{item.kilometer !== null ? item.kilometer : 'N/A'}</Table.Cell>
                                            <Table.Cell>{item.status_permintaan.nama}</Table.Cell>
                                            <Table.Cell>{item.mobil.nama}</Table.Cell>
                                            <Table.Cell>{item.driver ? item.driver.name : 'N/A'}</Table.Cell>
                                            <Table.Cell>{item.jam_berangkat ? item.jam_berangkat : 'N/A'}</Table.Cell>
                                            <Table.Cell>{item.jam_kembali ? item.jam_kembali : 'N/A'}</Table.Cell>
                                            <Table.Cell>{item.kilometer_terakhir !== null ? item.kilometer_terakhir : 'N/A'}</Table.Cell>
                                            <Table.Cell>{formatCurrency(item.biaya)}</Table.Cell>
                                            <Table.Cell textAlign="end">
                                                {/* <Button size="sm" color={'blue'} variant="surface" mr={2}>
                                                    Edit
                                                </Button> */}
                                                <Button
                                                    size="sm"
                                                    color={'red'}
                                                    variant="surface"
                                                    onClick={() => {
                                                        setPermintaan(item);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Table.ScrollArea>
                        <HStack justifyContent="space-between" py={2} flexWrap="wrap">
                            <HStack gap={2} wrap="wrap">
                                <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} size="sm">
                                    First
                                </Button>
                                <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} size="sm">
                                    Previous
                                </Button>
                                <Select
                                    size="sm"
                                    value={{ value: currentPage, label: String(currentPage) }}
                                    options={Array.from({ length: totalPages }, (_, i) => ({
                                        value: i + 1,
                                        label: String(i + 1),
                                    }))}
                                    onChange={(option) => {
                                        if (option) setCurrentPage(option.value);
                                    }}
                                    chakraStyles={{
                                        container: (provided) => ({ ...provided, width: 'auto' }),
                                        control: (provided) => ({ ...provided, minHeight: '32px', fontSize: 'sm' }),
                                        dropdownIndicator: (provided) => ({ ...provided, paddingX: 2 }),
                                        option: (provided) => ({ ...provided, fontSize: 'sm' }),
                                    }}
                                />
                                <Button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage >= totalPages}
                                    size="sm"
                                >
                                    Next
                                </Button>
                                <Button onClick={() => setCurrentPage(totalPages)} disabled={currentPage >= totalPages} size="sm">
                                    Last
                                </Button>
                                <Box fontSize="sm" color="gray.600">
                                    Page {currentPage} of {totalPages}
                                </Box>
                            </HStack>

                            <Select
                                value={pageSizeOptions.find((opt) => opt.value === itemsPerPage)}
                                onChange={(selectedOption) => {
                                    if (selectedOption) {
                                        setItemsPerPage(selectedOption.value);
                                        setCurrentPage(1);
                                    }
                                }}
                                options={pageSizeOptions}
                                isSearchable={false}
                                chakraStyles={{
                                    container: (provided) => ({ ...provided, width: '150px' }),
                                    control: (provided) => ({ ...provided, minHeight: '32px', fontSize: 'sm' }),
                                    dropdownIndicator: (provided) => ({ ...provided, paddingX: 2 }),
                                    option: (provided) => ({ ...provided, fontSize: 'sm' }),
                                }}
                                selectedOptionStyle="check"
                            />
                        </HStack>
                    </Box>
                </Grid>
            </Flex>
        </AppLayout>
    );
};
