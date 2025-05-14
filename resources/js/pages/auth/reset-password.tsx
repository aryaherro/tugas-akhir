import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { PasswordInput } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';
import { Button, Field, Fieldset, Grid, Input, ProgressCircle, Text } from '@chakra-ui/react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Reset password" description="Please enter your new password below">
            <Head title="Reset password" />

            <Fieldset.Root as={'form'} gap={6} onSubmit={submit}>
                <Fieldset.Legend />
                <Fieldset.Content>
                    <Field.Root as={Grid} gap={2}>
                        <Field.Label htmlFor="email">
                            <Text>Email</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            mt={1}
                            display="block"
                            w="full"
                            value={data.email}
                            readOnly
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <Field.HelperText />
                        <Field.ErrorText mt={2}>{errors.email}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="password">Password</Field.Label>
                        <PasswordInput
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            mt={1}
                            display="block"
                            w="full"
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.password}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="password_confirmation">Confirm password</Field.Label>
                        <PasswordInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            mt={1}
                            display="block"
                            w="full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm password"
                        />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.password_confirmation}</Field.ErrorText>
                    </Field.Root>

                    <Button type="submit" mt={4} w="full" disabled={processing}>
                        {processing && (
                            <ProgressCircle.Root value={null} size="sm">
                                <ProgressCircle.Circle>
                                    <ProgressCircle.Track />
                                    <ProgressCircle.Range />
                                </ProgressCircle.Circle>
                            </ProgressCircle.Root>
                        )}
                        Reset password
                    </Button>
                </Fieldset.Content>
            </Fieldset.Root>
        </AuthLayout>
    );
}
