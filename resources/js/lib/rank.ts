type AlternativeType = { id: number; nama: string; values: number[]; [key: string]: any };
type CriteriaType = { tipe: 'benefit' | 'cost'; [key: string]: any };
type RankedAlternative = {
    id: number;
    name: string;
    score: number;
    fifoRank: number;
    sawRank: number;
};

// Fungsi untuk normalisasi matrix SAW
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

// Fungsi untuk menghitung skor SAW
export function calculateSAWScores(alternatives: AlternativeType[], criteria: CriteriaType[]) {
    const normalized = normalizeMatrix(alternatives, criteria);
    return normalized.map((alt) => {
        const score = alt.normValues.reduce((acc, val, j) => acc + val * criteria[j].weight, 0);
        return {
            id: alt.id,
            name: alt.nama,
            score: Number(score.toFixed(4)),
        };
    });
}

// Fungsi untuk menghitung ranking FIFO
export function calculateFIFORanking(alternatives: AlternativeType[]) {
    return alternatives
        .sort((a, b) => new Date(a.waktu_daftar).getTime() - new Date(b.waktu_daftar).getTime())
        .map((alt, index) => ({
            id: alt.id,
            name: alt.nama,
            fifoRank: index + 1,
        }));
}

// Fungsi untuk menghitung akurasi SAW vs FIFO
export function calculateAccuracy(
    fifoRanking: any[],
    sawRanking: any[],
): {
    accuracy: number;
    exactMatches: number;
    closeMatches: number; // dalam range ±1
    details: RankedAlternative[];
} {
    const comparison: RankedAlternative[] = [];
    let exactMatches = 0;
    let closeMatches = 0;

    // Gabungkan data FIFO dan SAW
    fifoRanking.forEach((fifo) => {
        const saw = sawRanking.find((s) => s.id === fifo.id);
        if (saw) {
            const rankDiff = Math.abs(fifo.fifoRank - saw.sawRank);

            if (rankDiff === 0) exactMatches++;
            if (rankDiff <= 1) closeMatches++;

            comparison.push({
                id: fifo.id,
                name: fifo.name,
                score: saw.score,
                fifoRank: fifo.fifoRank,
                sawRank: saw.sawRank,
            });
        }
    });

    // Hitung akurasi berdasarkan exact matches
    const exactAccuracy = (exactMatches / comparison.length) * 100;

    return {
        accuracy: Number(exactAccuracy.toFixed(2)),
        exactMatches,
        closeMatches,
        details: comparison.sort((a, b) => a.sawRank - b.sawRank),
    };
}

// Fungsi untuk memberikan warna badge berdasarkan perbedaan ranking
export function getRankDifferenceColor(diff: number) {
    if (diff === 0) return 'green';
    if (diff === 1) return 'yellow';
    if (diff === 2) return 'orange';
    return 'red';
}
