import { ColorModeButton } from '@/components/ui/color-mode';
import { type SharedData } from '@/types';
import {
    Box,
    Button,
    Card,
    Container,
    Field,
    Fieldset,
    Flex,
    Heading,
    Icon,
    Input,
    Link as LinkChakra,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaAmbulance, FaMapMarkerAlt, FaNotesMedical, FaPhone } from 'react-icons/fa';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        symptoms: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission logic here
        // Reset form
        setFormData({
            name: '',
            address: '',
            phone: '',
            symptoms: '',
        });
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const falseFlag = false;

    return (
        <>
            <Head title="Welcome" />
            <Flex
                minH="max"
                flexDirection="column"
                alignItems="center"
                bg={{ base: '#FDFDFC', _dark: '#0a0a0a' }}
                p={{ base: '6', lg: '8' }}
                justifyContent={{ lg: 'center' }}
            >
                <Box as="header" mb="6" w="full" maxW={{ base: '335px', lg: '4xl' }} fontSize="sm">
                    <Flex as="nav" alignItems="center" justifyContent="end" gap="4">
                        {auth.user ? (
                            <LinkChakra
                                as={Link}
                                display="inline-block"
                                rounded="sm"
                                borderColor={{ base: { base: '#19140035', _hover: '#1915014a' }, _dark: { base: '#3E3E3A', _hover: '#62605b' } }}
                                px="5"
                                py="1.5"
                                fontSize="sm"
                                lineHeight="normal"
                                textDecoration={{ base: '#1b1b18', _dark: '#EDEDEC' }}
                                href={route('dashboard')}
                            >
                                Dashboard
                            </LinkChakra>
                        ) : (
                            <>
                                <LinkChakra
                                    as={Link}
                                    href={route('login')}
                                    display="inline-block"
                                    rounded="sm"
                                    px="5"
                                    py="1.5"
                                    fontSize="sm"
                                    lineHeight="normal"
                                    textDecorationColor={{ base: '#1b1b18', _dark: '#EDEDEC' }}
                                    borderColor={{ base: 'transparent', _hover: { base: '#19140035', _dark: '#3E3E3A' } }}
                                >
                                    Log in
                                </LinkChakra>
                                <LinkChakra
                                    as={Link}
                                    href={route('register')}
                                    display="inline-block"
                                    rounded="sm"
                                    px="5"
                                    py="1.5"
                                    fontSize="sm"
                                    lineHeight="normal"
                                    textDecorationColor={{ base: '#1b1b18', _dark: '#EDEDEC' }}
                                    borderColor={{ base: '#19140035', _dark: '#3E3E3A', _hover: { base: '#1915014a', _dark: '#62605b' } }}
                                >
                                    Register
                                </LinkChakra>
                            </>
                        )}
                        <ColorModeButton />
                    </Flex>
                </Box>
                <Flex
                    w="full"
                    alignItems="center"
                    justifyContent="center"
                    opacity={{ base: '100', _starting: '0' }}
                    transition={{ base: 'opacity', lg: 'grow' }}
                    animationDuration="750"
                >
                    <Flex as="main" flex="1" w="full" maxW={{ base: '335px', lg: '4xl' }} flexDirection={{ base: 'column-reverse', lg: 'row' }}>
                        {falseFlag ? (
                            <Box>
                                {/* Hero Section */}
                                <Box bg="red.500" color="white" py={20}>
                                    <Container maxW="container.xl">
                                        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
                                            <Box flex={1}>
                                                <Heading as="h1" size="2xl" mb={4}>
                                                    Layanan Ambulans 24 Jam
                                                </Heading>
                                                <Text fontSize="xl" mb={6}>
                                                    Pelayanan cepat dan tanggap untuk keadaan darurat medis
                                                </Text>
                                                <Button colorScheme="whiteAlpha" size="lg">
                                                    Hubungi Sekarang
                                                </Button>
                                            </Box>
                                            <Box flex={1} textAlign="center">
                                                <Icon as={FaAmbulance} boxSize={48} />
                                            </Box>
                                        </Flex>
                                    </Container>
                                </Box>

                                {/* Request Form Section */}
                                <Container maxW="container.md" py={16}>
                                    <Box boxShadow="lg" p={8} borderRadius="lg">
                                        <Heading as="h2" size="xl" mb={8} textAlign="center">
                                            Ajukan Permintaan Ambulans
                                        </Heading>
                                        <form onSubmit={handleSubmit}>
                                            <Stack gap={6}>
                                                <Fieldset.Root>
                                                    <Fieldset.Legend />
                                                    <Fieldset.Content>
                                                        <Field.Root>
                                                            <Field.Label>Nama Lengkap</Field.Label>
                                                            <Input
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                                placeholder="Masukkan nama lengkap"
                                                            />
                                                        </Field.Root>
                                                        <Field.Root required>
                                                            <Field.Label>Alamat Lengkap</Field.Label>
                                                            <Textarea
                                                                name="address"
                                                                value={formData.address}
                                                                onChange={handleChange}
                                                                placeholder="Masukkan alamat lengkap"
                                                                rows={3}
                                                            />
                                                        </Field.Root>
                                                        <Field.Root required>
                                                            <Field.Label>Nomor Telepon</Field.Label>
                                                            <Input
                                                                name="phone"
                                                                type="tel"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                placeholder="Masukkan nomor telepon"
                                                            />
                                                        </Field.Root>

                                                        <Field.Root required>
                                                            <Field.Label>Gejala/Kondisi Pasien</Field.Label>
                                                            <Textarea
                                                                name="symptoms"
                                                                value={formData.symptoms}
                                                                onChange={handleChange}
                                                                placeholder="Masukkan gejala atau kondisi pasien"
                                                                rows={3}
                                                            />
                                                        </Field.Root>

                                                        <Button type="submit" colorScheme="red" size="lg" width="full">
                                                            Minta Ambulans Sekarang
                                                        </Button>
                                                    </Fieldset.Content>
                                                </Fieldset.Root>
                                            </Stack>
                                        </form>
                                    </Box>
                                </Container>

                                {/* Services Section */}
                                <Box bg="gray.50" py={16}>
                                    <Container maxW="container.xl">
                                        <Heading as="h2" size="xl" mb={12} textAlign="center">
                                            Layanan Kami
                                        </Heading>
                                        <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
                                            <Card.Root>
                                                <Card.Header />
                                                <Card.Body alignItems="center">
                                                    <Icon as={FaAmbulance} boxSize={12} color="red.500" mb={4} />
                                                    <Heading size="md" mb={2}>
                                                        Ambulans Darurat
                                                    </Heading>
                                                    <Text>Layanan ambulans 24 jam dengan peralatan lengkap</Text>
                                                </Card.Body>
                                                <Card.Footer />
                                            </Card.Root>
                                            <Card.Root>
                                                <Card.Header />
                                                <Card.Body alignItems="center">
                                                    <Icon as={FaMapMarkerAlt} boxSize={12} color="red.500" mb={4} />
                                                    <Heading size="md" mb={2}>
                                                        Penjemputan Cepat
                                                    </Heading>
                                                    <Text>Respon cepat ke lokasi pasien di seluruh wilayah</Text>
                                                </Card.Body>
                                                <Card.Footer />
                                            </Card.Root>

                                            <Card.Root>
                                                <Card.Header />
                                                <Card.Body alignItems="center">
                                                    <Icon as={FaNotesMedical} boxSize={12} color="red.500" mb={4} />
                                                    <Heading size="md" mb={2}>
                                                        Tenaga Medis
                                                    </Heading>
                                                    <Text>Ditemani tenaga medis profesional dan berpengalaman</Text>
                                                </Card.Body>
                                            </Card.Root>
                                        </SimpleGrid>
                                    </Container>
                                </Box>

                                {/* Footer */}
                                <Box bg="gray.800" color="white" py={8}>
                                    <Container maxW="container.xl">
                                        <Flex justify="space-between" direction={{ base: 'column', md: 'row' }} align="center">
                                            <Text>&copy; 2024 Layanan Ambulans Darurat</Text>
                                            <Flex mt={{ base: 4, md: 0 }}>
                                                <Icon as={FaPhone} boxSize={5} mr={2} />
                                                <Text>Hotline: 0241-12345678</Text>
                                            </Flex>
                                        </Flex>
                                    </Container>
                                </Box>
                            </Box>
                        ) : (
                            <Text>Welcome to the application!</Text>
                        )}
                    </Flex>
                </Flex>
                <Box className="hidden h-14.5 lg:block"></Box>
            </Flex>
        </>
    );
}
