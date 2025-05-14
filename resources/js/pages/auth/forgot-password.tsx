// Components
import AuthLayout from '@/layouts/auth-layout';
import { Box, Button, Field, Flex, Grid, Input, Link as LinkChakra, ProgressCircle, Text } from '@chakra-ui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Forgot password" />

            {status && (
                <Text
                    mb="4"
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="medium"
                    colorScheme="green.600"
                    // className="mb-4 text-center text-sm font-medium text-green-600"
                >
                    {status}
                </Text>
            )}

            <Box spaceY="6">
                <form onSubmit={submit}>
                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="email">Email address</Field.Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        {/* <Field.RequiredIndicator /> */}
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.email}</Field.ErrorText>
                    </Field.Root>

                    <Flex my="6" alignItems="center" justifyContent="start">
                        <Button w="full" disabled={processing}>
                            {processing && (
                                <ProgressCircle.Root value={null} size="sm">
                                    <ProgressCircle.Circle>
                                        <ProgressCircle.Track />
                                        <ProgressCircle.Range />
                                    </ProgressCircle.Circle>
                                </ProgressCircle.Root>
                            )}
                            Email password reset link
                        </Button>
                    </Flex>
                </form>

                <Text spaceX="1" textAlign="center" fontSize="sm">
                    <span>Or, return to</span>
                    <LinkChakra as={Link} href={route('login')}>
                        log in
                    </LinkChakra>
                </Text>
            </Box>
        </AuthLayout>
    );
}
