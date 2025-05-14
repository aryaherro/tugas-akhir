import { PasswordInput } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';
import { Button as ButtonChakra, Checkbox, Field, Flex, Grid, Input, Link as LinkChakra, ProgressCircle, Text } from '@chakra-ui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            {/* <form className="flex flex-col gap-6" onSubmit={submit}> */}
            <Flex as="form" flexDirection="column" gap="6" onSubmit={submit}>
                <Grid gap="6">
                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="email">Email address</Field.Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.email}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root as={Grid} gap="2">
                        <Flex alignItems="center">
                            <Field.Label htmlFor="password">Password</Field.Label>
                            {canResetPassword && (
                                // <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                //     Forgot password?
                                // </TextLink>

                                // 'text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500',
                                <LinkChakra
                                    as={Link}
                                    href={route('password.request')}
                                    ml="auto"
                                    fontSize="sm"
                                    tabIndex={5}
                                    textUnderlineOffset="4"
                                    transition="colors"
                                    transitionDuration="300"
                                    transitionTimingFunction="ease-out"
                                    textDecorationColor={{ _hover: 'current' }}
                                >
                                    Forgot password?
                                </LinkChakra>
                            )}
                        </Flex>
                        {/* <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        /> */}
                        <PasswordInput
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.password}</Field.ErrorText>
                    </Field.Root>

                    <Flex alignItems="center" spaceX="3">
                        <Checkbox.Root
                            id="remember"
                            name="remember"
                            tabIndex={3}
                            checked={data.remember}
                            onCheckedChange={() => setData('remember', !data.remember)}
                            border="Highlight"
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>Remember me</Checkbox.Label>
                        </Checkbox.Root>
                    </Flex>

                    {/* <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button> */}
                    <ButtonChakra
                        type="submit"
                        mt="4"
                        w="full"
                        tabIndex={4}
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
                            <ProgressCircle.Root value={null} size="xs">
                                <ProgressCircle.Circle>
                                    <ProgressCircle.Track />
                                    <ProgressCircle.Range />
                                </ProgressCircle.Circle>
                            </ProgressCircle.Root>
                        )}
                        Log in
                    </ButtonChakra>
                </Grid>

                <Text textAlign="center" fontSize="sm">
                    Don't have an account?{' '}
                    <LinkChakra
                        as={Link}
                        href={route('register')}
                        tabIndex={5}
                        textUnderlineOffset="4"
                        transition="colors"
                        transitionDuration="300"
                        transitionTimingFunction="ease-out"
                        textDecorationColor={{ _hover: 'current' }}
                    >
                        Sign up
                    </LinkChakra>
                </Text>
            </Flex>
            {/* </form> */}

            {status && (
                <Text mb="4" textAlign="center" fontSize="sm" fontWeight="medium" colorScheme="green.600">
                    {status}
                </Text>
            )}
        </AuthLayout>
    );
}
