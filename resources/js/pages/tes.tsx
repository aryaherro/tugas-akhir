import { Box, Button, HStack, Input, InputGroup, Table } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useMemo, useState } from 'react';

const DataTable=() => {
    // Sample data
    const initialData=[
        { id: 1, name: 'Product A', price: 99.99, stock: 24 },
        { id: 2, name: 'Product B', price: 149.99, stock: 15 },
        { id: 3, name: 'Product C', price: 199.99, stock: 8 },
        { id: 4, name: 'Product D', price: 79.99, stock: 32 },
        { id: 5, name: 'Product E', price: 299.99, stock: 5 },
        { id: 6, name: 'Product F', price: 129.99, stock: 20 },
        { id: 7, name: 'Product G', price: 89.99, stock: 18 },
    ];


    // State management
    const [sortBy, setSortBy]=useState<keyof (typeof initialData)[0]|null>(null);
    const [sortOrder, setSortOrder]=useState<'asc'|'desc'>('asc');
    const [currentPage, setCurrentPage]=useState(1);
    const [itemsPerPage, setItemsPerPage]=useState(5);
    const [filterValue, setFilterValue]=useState('');

    // Filtering logic
    const filteredData=useMemo(() => {
        if (!filterValue) return initialData;

        const lowerFilter=filterValue.toLowerCase();
        return initialData.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(lowerFilter)));
    }, [initialData, filterValue]);

    // Sorting logic
    const sortedData=useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (!sortBy) return 0;
            const aValue=a[sortBy];
            const bValue=b[sortBy];

            if (typeof aValue==='number'&&typeof bValue==='number') {
                return sortOrder==='asc'? aValue-bValue:bValue-aValue;
            }

            return String(aValue).localeCompare(String(bValue))*(sortOrder==='asc'? 1:-1);
        });
    }, [filteredData, sortBy, sortOrder]);

    // Pagination logic
    const indexOfLastItem=currentPage*itemsPerPage;
    const indexOfFirstItem=indexOfLastItem-itemsPerPage;
    const currentItems=sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages=Math.ceil(sortedData.length/itemsPerPage);

    // Select options
    const pageSizeOptions=[
        { value: 5, label: '5 per page' },
        { value: 10, label: '10 per page' },
        { value: 20, label: '20 per page' },
        { value: filteredData.length, label: 'Show all' },
    ];

    const handleSort=(column: keyof (typeof initialData)[0]) => {
        if (sortBy===column) {
            setSortOrder(sortOrder==='asc'? 'desc':'asc');
        } else {
            setSortBy(column);
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
                <Table.Header bg="gray.100">
                    <Table.Row>
                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('id')} width="15%">
                            ID {sortBy==='id'&&(sortOrder==='asc'? '↑':'↓')}
                        </Table.ColumnHeader>

                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('name')}>
                            Product {sortBy==='name'&&(sortOrder==='asc'? '↑':'↓')}
                        </Table.ColumnHeader>

                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('price')} width="20%">
                            Price {sortBy==='price'&&(sortOrder==='asc'? '↑':'↓')}
                        </Table.ColumnHeader>

                        <Table.ColumnHeader cursor="pointer" onClick={() => handleSort('stock')} width="15%">
                            Stock {sortBy==='stock'&&(sortOrder==='asc'? '↑':'↓')}
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {currentItems.map((item) => (
                        <Table.Row key={item.id} _hover={{ bg: 'gray.50' }}>
                            <Table.Cell fontWeight="medium">{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>${item.price.toFixed(2)}</Table.Cell>
                            <Table.Cell>{item.stock}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer bg="gray.50">
                    <Table.Row>
                        <Table.Cell colSpan={4}>
                            <HStack justifyContent="space-between" py={2}>
                                <HStack gap={3}>
                                    <Button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage-1))}
                                        disabled={currentPage===1}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage+1))}
                                        disabled={currentPage>=totalPages}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Next
                                    </Button>
                                    <Box fontSize="sm" color="gray.600">
                                        Page {currentPage} of {totalPages} ({sortedData.length} items)
                                    </Box>
                                </HStack>

                                {/* Items per page selector */}
                                <Select
                                    value={pageSizeOptions.find((opt) => opt.value===itemsPerPage)}
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
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer>
            </Table.Root>
        </Box>
    );
};

export default DataTable;
