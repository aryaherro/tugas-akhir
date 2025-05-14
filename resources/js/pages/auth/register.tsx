import { PasswordInput, PasswordStrengthMeter } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';
import { Button, Field, Flex, Grid, Input, Link as LinkChakra, ProgressCircle, Text } from '@chakra-ui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <Flex as="form" flexDirection="column" gap="6" onSubmit={submit}>
                <Grid gap="6">
                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="name">Name</Field.Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText mt="2">{errors.name}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="email">Email address</Field.Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.email}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="password">Password</Field.Label>
                        <PasswordInput
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <PasswordStrengthMeter value={data.password.length / 4} />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.password}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="password_confirmation">Confirm password</Field.Label>
                        <PasswordInput
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.password_confirmation}</Field.ErrorText>
                    </Field.Root>

                    <Grid gap="6">
                        <Button
                            type="submit"
                            mt="2"
                            w="full"
                            tabIndex={5}
                            data-slot="button"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            gap="2"
                            whiteSpace="nowrap"
                            rounded="md"
                            fontSize="sm"
                            fontWeight="medium"
                            disabled={processing}
                        >
                            {processing && (
                                <ProgressCircle.Root value={null} size="sm">
                                    <ProgressCircle.Circle>
                                        <ProgressCircle.Track />
                                        <ProgressCircle.Range />
                                    </ProgressCircle.Circle>
                                </ProgressCircle.Root>
                            )}
                            Create account
                        </Button>
                    </Grid>

                    <Text textAlign="center" fontSize="sm">
                        Already have an account?{' '}
                        <LinkChakra
                            as={Link}
                            href={route('login')}
                            tabIndex={6}
                            textUnderlineOffset="4"
                            transition="colors"
                            transitionDuration="300"
                            transitionTimingFunction="ease-out"
                            textDecorationColor={{ _hover: 'current' }}
                        >
                            Log in
                        </LinkChakra>
                    </Text>
                </Grid>
            </Flex>
        </AuthLayout>
    );
}
