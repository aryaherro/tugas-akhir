import { SingleDatePickerPopup } from '@/components/DatePicker';
import { DatePickerStyleConfig, defaultDatePickerStyle } from '@/components/DatePicker/type';
import AppLayout from '@/layouts/app-layout';
import { calculateAccuracy, calculateFIFORanking, calculateSAWScores, getRankDifferenceColor } from '@/lib/rank';
import { Alert, Badge, Box, Button, Card, Flex, Grid, Heading, HStack, Input, Progress, Stack, Table, Text, useDisclosure } from '@chakra-ui/react';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';

type CriteriaType = {
    nama: string;
    weight: number;
    tipe: 'benefit' | 'cost';
};
type AlternativeType = {
    id: number;
    tanggal: string;
    nama: string;
    values: number[];
};

interface SAWModuleProps {
    criteria: CriteriaType[];
    alternatives: AlternativeType[];
}

export default function Hasil({ criteria, alternatives }: SAWModuleProps) {
    // Hitung ranking SAW
    const sawScores = calculateSAWScores(alternatives, criteria);
    const sawRanking = sawScores.sort((a, b) => Number(b.score) - Number(a.score)).map((item, index) => ({ ...item, sawRank: index + 1 }));

    // Hitung ranking FIFO
    const fifoRanking = calculateFIFORanking(alternatives);

    // Hitung akurasi
    const accuracyData = calculateAccuracy(fifoRanking, sawRanking);

    const pickerFilterDisclosure = useDisclosure();
    const [popupSelectedDate, setPopupSelectedDate] = useState(new Date());
    const [popupFilterDate, setPopupFilterDate] = useState(new Date());
    const [datePickerStyle, setDatePickerStyle] = useState<DatePickerStyleConfig>(defaultDatePickerStyle);
    const [pickerFilterStringDate, setPickerFilterStringDate] = useState<string | null>(null);

    const handleSetFilterDate = (date: Date) => {
        setPopupFilterDate(date);
        const $year = date.getFullYear();
        const $month = date.getMonth() + 1;
        const $day = date.getDate() + 1;
        const $tanggalString = new Date($year, $month - 1, $day);
        setPickerFilterStringDate($tanggalString.toISOString().substring(0, 10));
        router.reload({
            only: ['alternatives'],
            data: {
                tanggal: $tanggalString.toISOString().substring(0, 10),
            },
        });
    };
    return (
        <AppLayout>
            <Head title="Kegiatan" />
            <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                <Box p={4}>
                    <Heading size="lg" mb={4}>
                        Antrian Berdasarkan Tanggal
                    </Heading>
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
                                value={format(popupFilterDate, 'dd/MM/yyyy')}
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
                                router.visit(route('antrian'), {
                                    only: ['alternatives'],
                                });
                            }}
                        >
                            Reset
                        </Button>
                    </HStack>
                    {alternatives && alternatives.length === 0 ? (
                        <Alert.Root status="info" mt={4} mb={4}>
                            <Alert.Indicator />
                            <Alert.Content>
                                <Alert.Title>Belum Ada Antrian</Alert.Title>
                                <Alert.Description>Belum ada antrian pada tanggal ini, silahkan pilih tanggal lain</Alert.Description>
                            </Alert.Content>
                        </Alert.Root>
                    ) : (
                        <>
                            <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                                <Card.Root mt={4} mb={4} p={4} shadow="md" rounded="lg">
                                    <Card.Header>
                                        <Text>Akurasi SAW</Text>
                                    </Card.Header>
                                    <Card.Body>
                                        <Stack align="start" gap={2}>
                                            <Progress.Root
                                                maxW="240px"
                                                value={accuracyData.accuracy}
                                                colorPalette="blue"
                                                w="full"
                                                min={0}
                                                max={100}
                                                striped
                                                animated
                                            >
                                                <Progress.Track>
                                                    <Progress.Range />
                                                </Progress.Track>
                                                <Progress.ValueText>{accuracyData.accuracy}%</Progress.ValueText>
                                            </Progress.Root>
                                            <Text fontSize="xs" color="gray.500">
                                                {accuracyData.exactMatches}/{alternatives.length} ranking sama persis
                                            </Text>
                                        </Stack>
                                    </Card.Body>
                                </Card.Root>

                                <Card.Root mt={4} mb={4} p={4} shadow="md" rounded="lg">
                                    <Card.Header>
                                        <Text>Match Mendekati</Text>
                                    </Card.Header>
                                    <Card.Body>
                                        <Stack dir="column" align="start" gap={2}>
                                            <Progress.Root
                                                maxW="240px"
                                                value={(accuracyData.closeMatches / alternatives.length) * 100}
                                                colorPalette="green"
                                                w="full"
                                                min={0}
                                                max={100}
                                                striped
                                                animated
                                            >
                                                <Progress.Track>
                                                    <Progress.Range />
                                                </Progress.Track>
                                                <Progress.ValueText>
                                                    {((accuracyData.closeMatches / alternatives.length) * 100).toFixed(1)}%
                                                </Progress.ValueText>
                                            </Progress.Root>
                                            <Text fontSize="xs" color="gray.500">
                                                {accuracyData.closeMatches}/{alternatives.length} dalam range ±1
                                            </Text>
                                        </Stack>
                                    </Card.Body>
                                </Card.Root>

                                <Card.Root mt={4} mb={4} p={4} shadow="md" rounded="lg">
                                    <Card.Header>
                                        <Text>Total Permintaan</Text>
                                    </Card.Header>
                                    <Card.Body>
                                        <Stack gap={2}>
                                            <Text fontSize="xl" color="purple.500">
                                                {alternatives.length}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                Permintaan ambulan hari ini
                                            </Text>
                                        </Stack>
                                    </Card.Body>
                                </Card.Root>
                            </Grid>
                            {/* Tabel Perbandingan Ranking */}
                            <Card.Root p={4} mb={6}>
                                <Card.Header>
                                    <Text fontSize="sm" color="gray.600">
                                        Perbandingan Ranking FIFO vs SAW
                                    </Text>
                                </Card.Header>
                                {/* <Heading size="md" mb={4}>
                                    Perbandingan Ranking FIFO vs SAW
                                </Heading> */}
                                <Card.Body>
                                    <Table.Root variant="line">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.ColumnHeader>Permintaan</Table.ColumnHeader>
                                                <Table.ColumnHeader textAlign="center">Ranking FIFO</Table.ColumnHeader>
                                                <Table.ColumnHeader textAlign="center">Ranking SAW</Table.ColumnHeader>
                                                <Table.ColumnHeader textAlign="center">Skor SAW</Table.ColumnHeader>
                                                <Table.ColumnHeader textAlign="center">Selisih</Table.ColumnHeader>
                                                <Table.ColumnHeader textAlign="center">Status</Table.ColumnHeader>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {accuracyData.details.map((item) => {
                                                const rankDiff = Math.abs(item.fifoRank - item.sawRank);
                                                return (
                                                    <Table.Row key={item.id}>
                                                        <Table.Cell fontWeight="medium">{item.name}</Table.Cell>
                                                        <Table.Cell textAlign="center">
                                                            <Badge colorScheme="gray">#{item.fifoRank}</Badge>
                                                        </Table.Cell>
                                                        <Table.Cell textAlign="center">
                                                            <Badge colorScheme="blue">#{item.sawRank}</Badge>
                                                        </Table.Cell>
                                                        <Table.Cell textAlign="center">{item.score}</Table.Cell>
                                                        <Table.Cell textAlign="center">
                                                            <Text color={rankDiff === 0 ? 'green.500' : 'orange.500'}>
                                                                {rankDiff === 0 ? '0' : `±${rankDiff}`}
                                                            </Text>
                                                        </Table.Cell>
                                                        <Table.Cell textAlign="center">
                                                            <Badge colorScheme={getRankDifferenceColor(rankDiff)}>
                                                                {rankDiff === 0
                                                                    ? 'Sama'
                                                                    : rankDiff === 1
                                                                      ? 'Mendekati'
                                                                      : rankDiff === 2
                                                                        ? 'Cukup Dekat'
                                                                        : 'Berbeda'}
                                                            </Badge>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Body>
                                    </Table.Root>
                                </Card.Body>
                            </Card.Root>
                        </>
                    )}
                </Box>
            </Flex>
        </AppLayout>
    );
}
