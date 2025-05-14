// Components
import { Head, useForm } from '@inertiajs/react';
import { Grid } from 'lucide-react';
import { FormEventHandler } from 'react';

import { PasswordInput } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';
import { Button, Field, Fieldset, Flex, ProgressCircle } from '@chakra-ui/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Confirm your password"
            description="This is a secure area of the application. Please confirm your password before continuing."
        >
            <Head title="Confirm password" />

            <Fieldset.Root as={'form'} gap={6} onSubmit={submit}>
                <Fieldset.Legend />
                <Fieldset.Content>
                    <Field.Root as={Grid} gap="2">
                        <Field.Label htmlFor="password">Password</Field.Label>
                        <PasswordInput
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={data.password}
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <Field.RequiredIndicator />
                        {/* <Field.HelperText /> */}
                        <Field.ErrorText>{errors.password}</Field.ErrorText>
                    </Field.Root>
                    <Flex alignItems="center">
                        <Button type="submit" w="full" disabled={processing}>
                            {processing && (
                                <ProgressCircle.Root value={null} size="sm">
                                    <ProgressCircle.Circle>
                                        <ProgressCircle.Track />
                                        <ProgressCircle.Range />
                                    </ProgressCircle.Circle>
                                </ProgressCircle.Root>
                            )}
                            Confirm password
                        </Button>
                    </Flex>
                </Fieldset.Content>
            </Fieldset.Root>
        </AuthLayout>
    );
}
