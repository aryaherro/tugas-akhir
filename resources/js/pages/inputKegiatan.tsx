import { SingleDatePickerPopup } from '@/components/DatePicker';
import { DatePickerStyleConfig, defaultDatePickerStyle } from '@/components/DatePicker/type';
import { toaster, Toaster } from '@/components/ui/toaster';
import AppLayout from '@/layouts/app-layout';
import { hasRole } from '@/lib/utils';
import { SharedData } from '@/types';
import { Box, Button, Collapsible, Field, Fieldset, Flex, Heading, Input, NumberInput, Show, Stack, useDisclosure } from '@chakra-ui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Select } from 'chakra-react-select';
import { useState } from 'react';

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
    id: null;
    tanggal: Date | null;
    tipe_permintaan: StandarType;
    pasien: PasienType;
    triase: TriaseType;
    penjamin_biaya: StandarType;
    mobil: MobilType;
    unit: StandarType;
    creator: UserType | null;
    tujuan: string;
    kilometer: number;
    status_permintaan: StandarType;
    driver: UserType | null;
    jam_berangkat: string | null;
    jam_kembali: string | null;
    kilometer_terakhir: number | null;
    biaya: number | null;
};
export default function Tes2({
    tipe_permintaan,
    pasien,
    triase,
    penjamin_biaya,
    mobil,
    unit,
    creator,
    status_permintaan,
    driver,
}: {
    tipe_permintaan: StandarType[];
    pasien: PasienType[];
    triase: TriaseType[];
    penjamin_biaya: StandarType[];
    mobil: MobilType[];
    unit: StandarType[];
    creator: UserType | null;
    status_permintaan: StandarType[];
    driver: UserType | null;
}) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const pickerDisclosure = useDisclosure();
    const [popupSelectedDate, setPopupSelectedDate] = useState(new Date());
    const [datePickerStyle, setDatePickerStyle] = useState<DatePickerStyleConfig>(defaultDatePickerStyle);
    const [CollapsibleOpen, setCollapsibleOpen] = useState(false);
    const {
        data: permintaan,
        setData: setPermintaan,
        reset,
        processing,
    } = useForm<PermintaanType>({
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
        kilometer: 1,
        status_permintaan: { id: 0, nama: '' },
        driver: null,
        jam_berangkat: null,
        jam_kembali: null,
        kilometer_terakhir: null,
        biaya: 0,
    });
    const [selectedTipePermintaanOption, setSelectedTipePermintaanOption] = useState<{ value: number; label: string } | null>(null);
    const [selectedPasienOption, setSelectedPasienOption] = useState<{ value: number; label: string } | null>(null);
    const [selectedTriaseOption, setSelectedTriaseOption] = useState<{ value: number; label: string } | null>(null);
    const [selectedPenjaminOption, setSelectedPenjaminOption] = useState<{ value: number; label: string } | null>(null);
    const [selectedUnitOption, setSelectedUnitOption] = useState<{ value: number; label: string } | null>(null);
    const [selectedKilometer, setSelectedKilometer] = useState<{ value: string; valueAsNumber: number } | null>(null);
    const handleSelectTipePermintaanChange = (e: any) => {
        setPermintaan({
            ...permintaan,
            tipe_permintaan: {
                id: e.value,
                nama: e.label,
            },
        });
        setSelectedTipePermintaanOption(e);
    };
    const handleSelectPasienChange = (e: any) => {
        setPermintaan({
            ...permintaan,
            pasien: {
                id: e.value,
                nama: e.label.split(' - ')[1],
                no_rm: parseInt(e.label.split(' - ')[0]),
            },
        });
        setSelectedPasienOption(e);
    };
    const handleSelectTriaseChange = (e: any) => {
        setPermintaan({
            ...permintaan,
            triase: {
                id: e.value,
                warna: e.label,
                keterangan: '',
            },
        });
        setSelectedTriaseOption(e);
    };
    const handleSelectPenjaminChange = (e: any) => {
        setPermintaan({
            ...permintaan,
            penjamin_biaya: {
                id: e.value,
                nama: e.label,
            },
        });
        setSelectedPenjaminOption(e);
    };
    const handleSelectUnitChange = (e: any) => {
        setSelectedUnitOption(e);
        setPermintaan({
            ...permintaan,
            unit: {
                id: e.value,
                nama: e.label,
            },
        });
    };

    const handleKilometerChange = (e: any) => {
        setSelectedKilometer({
            value: e.value,
            valueAsNumber: e.valueAsNumber,
        });
        setPermintaan({
            ...permintaan,
            kilometer: e.valueAsNumber,
        });
    };

    const handleSetDate = (date: Date) => {
        const $year = date.getFullYear();
        const $month = date.getMonth();
        const $day = date.getDate();
        const $tanggalString = new Date($year, $month, $day);
        setPermintaan({
            ...permintaan,
            tanggal: $tanggalString,
        });
        setPopupSelectedDate(date);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // console.log(permintaan);
        router.post(route('permintaan-layanan.store'), permintaan, {
            onSuccess: () => {
                reset();
                setCollapsibleOpen(false);
                toaster.create({
                    title: 'Permintaan created',
                    type: 'success',
                });
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Kegiatan" />
            <Flex h="full" flex="auto" flexDir="column" gap="4" rounded="xl" p="4">
                <Toaster />
                <Box p={4}>
                    <Heading size="lg" mb={4}>
                        Input Kegiatan
                    </Heading>
                    <Collapsible.Root unmountOnExit open={CollapsibleOpen}>
                        <Collapsible.Trigger paddingY="3" asChild>
                            <Button onClick={() => setCollapsibleOpen(!CollapsibleOpen)}>{CollapsibleOpen ? 'Batal' : 'Tambah Permintaan'}</Button>
                        </Collapsible.Trigger>
                        <Collapsible.Content mt="2">
                            <Fieldset.Root>
                                <Stack>
                                    <Fieldset.Legend>Tambah Permintaan</Fieldset.Legend>
                                    <Fieldset.HelperText>Masukkan Detail Permintaan.</Fieldset.HelperText>
                                </Stack>

                                <Fieldset.Content>
                                    <Show when={hasRole('admin')}>
                                        <Field.Root>
                                            <Field.Label>Pilih Tanggal</Field.Label>
                                            <SingleDatePickerPopup
                                                isOpen={pickerDisclosure.open}
                                                onClose={pickerDisclosure.onClose}
                                                onOpen={pickerDisclosure.onOpen}
                                                selectedDate={popupSelectedDate}
                                                onSetDate={handleSetDate}
                                                datePickerStyle={datePickerStyle}
                                            >
                                                <Input
                                                    value={popupSelectedDate.toLocaleDateString('id-ID')}
                                                    onClick={pickerDisclosure.onOpen}
                                                    readOnly
                                                    placeholder="Pilih Tanggal"
                                                />
                                            </SingleDatePickerPopup>
                                        </Field.Root>
                                    </Show>

                                    <Field.Root>
                                        <Field.Label>Tipe Permintaan</Field.Label>
                                        <Select
                                            options={tipe_permintaan.map((item) => ({
                                                value: item.id,
                                                label: item.nama,
                                            }))}
                                            onChange={handleSelectTipePermintaanChange}
                                            value={selectedTipePermintaanOption}
                                            placeholder="Select Permission"
                                        />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Pasien</Field.Label>
                                        <Select
                                            options={pasien.map((item) => ({
                                                value: item.id,
                                                label: `${item.no_rm} - ${item.nama}`,
                                            }))}
                                            onChange={handleSelectPasienChange}
                                            value={selectedPasienOption}
                                            placeholder="Select Pasien"
                                        />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Triase</Field.Label>
                                        <Select
                                            options={triase.map((item) => ({
                                                value: item.id,
                                                label: item.warna,
                                            }))}
                                            onChange={handleSelectTriaseChange}
                                            value={selectedTriaseOption}
                                            placeholder="Select Triase"
                                        />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Penjamin Biaya</Field.Label>
                                        <Select
                                            options={penjamin_biaya.map((item) => ({
                                                value: item.id,
                                                label: item.nama,
                                            }))}
                                            onChange={handleSelectPenjaminChange}
                                            value={selectedPenjaminOption}
                                            placeholder="Select Penjamin Biaya"
                                        />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Unit</Field.Label>
                                        <Select
                                            options={unit.map((item) => ({
                                                value: item.id,
                                                label: item.nama,
                                            }))}
                                            onChange={handleSelectUnitChange}
                                            value={selectedUnitOption}
                                            placeholder="Select Unit"
                                        />
                                    </Field.Root>
                                    <Field.Root required>
                                        <Field.Label>Tujuan</Field.Label>
                                        <Input
                                            type="text"
                                            name="tujuan"
                                            autoComplete="address-line1"
                                            value={permintaan.tujuan}
                                            onChange={(e) => setPermintaan({ ...permintaan, tujuan: e.target.value })}
                                            placeholder="Masukkan Tujuan"
                                        />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Kilometer</Field.Label>
                                        <NumberInput.Root
                                            step={1}
                                            min={1}
                                            defaultValue={'1'}
                                            value={selectedKilometer?.value}
                                            onValueChange={handleKilometerChange}
                                        >
                                            <NumberInput.Control />
                                            <NumberInput.Input />
                                        </NumberInput.Root>
                                    </Field.Root>
                                </Fieldset.Content>

                                <Button onClick={handleSubmit} type="submit" alignSelf="flex-start">
                                    Submit
                                </Button>
                            </Fieldset.Root>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </Box>
            </Flex>
        </AppLayout>
    );
}
