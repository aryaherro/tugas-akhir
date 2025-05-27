import { Box, Button, HStack, Input, InputGroup, Table } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useMemo, useState } from 'react';

// Fungsi untuk ambil nilai bersarang (contoh: "tipe_permintaan.nama")
const getNestedValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc?.[part], obj);

const DataTable = () => {
    // Sample data dengan relasi
    const initialData = [
        {
            id: 1,
            name: 'Product A',
            price: 99.99,
            stock: 24,
            tipe_permintaan: { nama: 'Reguler' },
            pasien: { nama: 'John Doe' },
        },
        {
            id: 2,
            name: 'Product B',
            price: 149.99,
            stock: 15,
            tipe_permintaan: { nama: 'Emergensi' },
            pasien: { nama: 'Jane Smith' },
        },
        {
            id: 3,
            name: 'Product C',
            price: 199.99,
            stock: 8,
            tipe_permintaan: { nama: 'Reguler' },
            pasien: { nama: 'Albert T' },
        },
        // Tambahkan lainnya jika perlu
    ];

    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filterValue, setFilterValue] = useState('');

    const filteredData = useMemo(() => {
        if (!filterValue) return initialData;

        const lowerFilter = filterValue.toLowerCase();
        return initialData.filter((item) =>
            Object.values(item).some((value) =>
                typeof value === 'object'
                    ? Object.values(value).some((v) => String(v).toLowerCase().includes(lowerFilter))
                    : String(value).toLowerCase().includes(lowerFilter),
            ),
        );
    }, [initialData, filterValue]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (!sortBy) return 0;

            const aVal = getNestedValue(a, sortBy) ?? '';
            const bVal = getNestedValue(b, sortBy) ?? '';

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            }

            return String(aVal).localeCompare(String(bVal)) * (sortOrder === 'asc' ? 1 : -1);
        });
    }, [filteredData, sortBy, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const pageSizeOptions = [
        { value: 5, label: '5 per page' },
        { value: 10, label: '10 per page' },
        { value: 20, label: '20 per page' },
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

    return (
        <Box p={4}>
            {/* Search Input */}
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

            {/* Table */}
            <Table.Root variant="line" size="md">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                            ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                            Product {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                            Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader onClick={() => handleSort('stock')} style={{ cursor: 'pointer' }}>
                            Stock {sortBy === 'stock' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader onClick={() => handleSort('tipe_permintaan.nama')} style={{ cursor: 'pointer' }}>
                            Tipe Permintaan {sortBy === 'tipe_permintaan.nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader onClick={() => handleSort('pasien.nama')} style={{ cursor: 'pointer' }}>
                            Pasien {sortBy === 'pasien.nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {currentItems.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>${item.price.toFixed(2)}</Table.Cell>
                            <Table.Cell>{item.stock}</Table.Cell>
                            <Table.Cell>{item.tipe_permintaan?.nama}</Table.Cell>
                            <Table.Cell>{item.pasien?.nama}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {/* Footer: Pagination + Page Size */}
            <HStack justifyContent="space-between" py={4}>
                <HStack gap={3}>
                    <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} variant="outline" size="sm">
                        Previous
                    </Button>
                    <Button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage >= totalPages}
                        variant="outline"
                        size="sm"
                    >
                        Next
                    </Button>
                    <Box fontSize="sm" color="gray.600">
                        Page {currentPage} of {totalPages} ({sortedData.length} items)
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
                        container: (provided) => ({
                            ...provided,
                            width: '150px',
                        }),
                        control: (provided) => ({
                            ...provided,
                            minHeight: '32px',
                            fontSize: 'sm',
                        }),
                        dropdownIndicator: (provided) => ({
                            ...provided,
                            paddingX: 2,
                        }),
                        option: (provided) => ({
                            ...provided,
                            fontSize: 'sm',
                        }),
                    }}
                    selectedOptionStyle="check"
                />
            </HStack>
        </Box>
    );
};

export default DataTable;
