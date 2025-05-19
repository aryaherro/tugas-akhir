import AppLayout from '@/layouts/app-layout';
import { Box, Flex, Heading, HStack, List, Slider, Table, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

type CriteriaType = {
    nama: string;
    weight: number;
    tipe: 'benefit' | 'cost';
};
type AlternativeType = {
    nama: string;
    values: number[];
};

function normalizeMatrix(alternatives: AlternativeType[], criteria: CriteriaType[]) {
    const numCriteria = criteria.length;
    const maxVals = Array(numCriteria).fill(0);
    const minVals = Array(numCriteria).fill(Infinity);

    for (let j = 0; j < numCriteria; j++) {
        for (const alt of alternatives) {
            maxVals[j] = Math.max(maxVals[j], alt.values[j]);
            minVals[j] = Math.min(minVals[j], alt.values[j]);
        }
    }

    return alternatives.map((alt) => {
        const normValues = alt.values.map((val, j) => {
            return criteria[j].tipe === 'benefit' ? val / maxVals[j] : minVals[j] / val;
        });
        return { ...alt, normValues };
    });
}

function calculateScores(alternatives: AlternativeType[], criteria: CriteriaType[]) {
    const normalized = normalizeMatrix(alternatives, criteria);
    return normalized.map((alt) => {
        const score = alt.normValues.reduce((acc, val, j) => acc + val * criteria[j].weight, 0);
        return { name: alt.nama, score: score.toFixed(4) };
    });
}

interface SAWModuleProps {
    criteria: CriteriaType[];
    alternatives: AlternativeType[];
}

export default function SAWModule({ criteria, alternatives }: SAWModuleProps) {
    const rankedAlternatives = calculateScores(alternatives, criteria).sort((a, b) => Number(b.score) - Number(a.score));

    return (
        <AppLayout>
            <Head title="Kegiatan" />
            <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                <Box p={4}>
                    <Heading size="lg" mb={4}>
                        SAW Module
                    </Heading>
                    <Table.Root variant="line" mb={6}>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Alternatif</Table.ColumnHeader>
                                {criteria.map((c, i) => (
                                    <Table.ColumnHeader key={i}>
                                        {c.nama} ({c.tipe})
                                    </Table.ColumnHeader>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {alternatives.map((alt, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell>{alt.nama}</Table.Cell>
                                    {alt.values.map((v, j) => (
                                        <Table.Cell key={j}>{v}</Table.Cell>
                                    ))}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>

                    {criteria.map((criteriaitem, i) => (
                        <Slider.Root
                            maxW="sm"
                            size="sm"
                            defaultValue={[Math.round(Number(criteriaitem.weight) * 100)]}
                            value={[criteriaitem.weight * 100]}
                            onValueChangeEnd={() => {
                                criteria[i].weight = Number(criteriaitem.weight / 100);
                            }}
                            step={10}
                            key={i}
                        >
                            <HStack justify="space-between">
                                <Slider.Label>{criteriaitem.nama}</Slider.Label>
                                <Slider.ValueText />
                            </HStack>
                            <Slider.Control>
                                <Slider.Track>
                                    <Slider.Range />
                                </Slider.Track>
                                <Slider.Thumbs />
                            </Slider.Control>
                        </Slider.Root>
                    ))}
                    <Slider.Root maxW="sm" size="sm" defaultValue={[140]} max={100} step={10}>
                        <HStack justify="space-between">
                            <Slider.Label>Coba</Slider.Label>
                            <Slider.ValueText />
                        </HStack>
                        <Slider.Control>
                            <Slider.Track>
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumbs />
                        </Slider.Control>
                    </Slider.Root>

                    <Heading size="md" mb={2}>
                        Peringkat:
                    </Heading>
                    <List.Root as="ol" gap={2}>
                        {rankedAlternatives.map((item, i) => (
                            <List.Item key={i}>
                                <Text>
                                    {item.name} - Skor: {item.score}
                                </Text>
                            </List.Item>
                        ))}
                    </List.Root>
                </Box>
            </Flex>
        </AppLayout>
    );
}
// export default function SAWModule() {
//     const [criteria, setCriteria] = useState([
//         { name: 'Harga', weight: 0.4, type: 'cost' },
//         { name: 'Kualitas', weight: 0.3, type: 'benefit' },
//         { name: 'Layanan', weight: 0.3, type: 'benefit' },
//     ]);

//     const [alternatives, setAlternatives] = useState([
//         { name: 'Produk A', values: [50, 7, 9] },
//         { name: 'Produk B', values: [30, 9, 8] },
//         { name: 'Produk C', values: [40, 8, 7] },
//     ]);

//     const normalizeMatrix = () => {
//         const numCriteria = criteria.length;
//         const maxVals = Array(numCriteria).fill(0);
//         const minVals = Array(numCriteria).fill(Infinity);

//         for (let j = 0; j < numCriteria; j++) {
//             for (const alt of alternatives) {
//                 maxVals[j] = Math.max(maxVals[j], alt.values[j]);
//                 minVals[j] = Math.min(minVals[j], alt.values[j]);
//             }
//         }

//         return alternatives.map((alt) => {
//             const normValues = alt.values.map((val, j) => {
//                 return criteria[j].type === 'benefit' ? val / maxVals[j] : minVals[j] / val;
//             });
//             return { ...alt, normValues };
//         });
//     };

//     const calculateScores = () => {
//         const normalized = normalizeMatrix();
//         return normalized.map((alt) => {
//             const score = alt.normValues.reduce((acc, val, j) => acc + val * criteria[j].weight, 0);
//             return { name: alt.name, score: score.toFixed(4) };
//         });
//     };

//     const rankedAlternatives = calculateScores().sort((a, b) => Number(b.score) - Number(a.score));

//     return (
//         <AppLayout>
//             <Head title="Kegiatan" />
//             <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
//                 <Box p={4}>
//                     <Heading size="lg" mb={4}>
//                         SAW Module
//                     </Heading>
//                     <Table.Root variant="line" mb={6}>
//                         <Table.Header>
//                             <Table.Row>
//                                 <Table.ColumnHeader>Alternatif</Table.ColumnHeader>
//                                 {criteria.map((c, i) => (
//                                     <Table.ColumnHeader key={i}>
//                                         {c.name} ({c.type})
//                                     </Table.ColumnHeader>
//                                 ))}
//                             </Table.Row>
//                         </Table.Header>
//                         <Table.Body>
//                             {alternatives.map((alt, i) => (
//                                 <Table.Row key={i}>
//                                     <Table.Cell>{alt.name}</Table.Cell>
//                                     {alt.values.map((v, j) => (
//                                         <Table.Cell key={j}>{v}</Table.Cell>
//                                     ))}
//                                 </Table.Row>
//                             ))}
//                         </Table.Body>
//                     </Table.Root>

//                     <Heading size="md" mb={2}>
//                         Peringkat:
//                     </Heading>
//                     <List.Root as="ol" gap={2}>
//                         {rankedAlternatives.map((item, i) => (
//                             <List.Item key={i}>
//                                 <Text>
//                                     {item.name} - Skor: {item.score}
//                                 </Text>
//                             </List.Item>
//                         ))}
//                     </List.Root>
//                 </Box>
//             </Flex>
//         </AppLayout>
//     );
// }
