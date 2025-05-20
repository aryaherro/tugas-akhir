import AppLayout from '@/layouts/app-layout';
import { Flex, Grid, List, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

type CriteriaType = {
    nama: string;
    weight: number;
    tipe: 'benefit' | 'cost';
};
type AlternativeType = {
    tanggal: string;
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

export default function Dashboard({ criteria, alternatives }: SAWModuleProps) {
    const rankedAlternatives = calculateScores(alternatives, criteria).sort((a, b) => Number(b.score) - Number(a.score));
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                <Grid gridAutoRows="min-content" gap="4" md={{ gridColumn: '3' }}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Antrian Hari Ini
                    </Text>
                    {rankedAlternatives.length === 0 ? (
                        <Text fontSize="lg" color="gray.500">
                            Belum ada antrian hari ini
                        </Text>
                    ) : (
                        <List.Root as="ol" gap={2}>
                            {rankedAlternatives.map((item, i) => (
                                <List.Item key={i}>
                                    <Text>
                                        {item.name} - Skor: {item.score}
                                    </Text>
                                </List.Item>
                            ))}
                        </List.Root>
                    )}
                </Grid>
            </Flex>
        </AppLayout>
    );
}
