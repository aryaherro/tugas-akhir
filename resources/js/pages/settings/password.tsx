import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { PasswordInput, PasswordStrengthMeter } from '@/components/ui/password-input';
// import { Button } from '@/components2/ui/button';
import { Box, Button, Field, Flex, Grid, Text } from '@chakra-ui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Profile settings" />

            <SettingsLayout>
                <Box spaceY="6">
                    <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

                    <Box as="form" spaceY="6" onSubmit={updatePassword} className="space-y-6">
                        <Field.Root as={Grid} gap="2">
                            <Field.Label htmlFor="current_password">Current password</Field.Label>
                            <PasswordInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                mt="1"
                                display="block"
                                w="full"
                                autoComplete="current-password"
                                placeholder="Current password"
                            />
                            <Field.RequiredIndicator />
                            {/* <Field.HelperText /> */}
                            <Field.ErrorText>{errors.current_password}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root as={Grid} gap="2">
                            <Field.Label htmlFor="password">Password</Field.Label>
                            <PasswordInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                mt="1"
                                display="block"
                                w="full"
                                autoComplete="new-password"
                                disabled={processing}
                                placeholder="New password"
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
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                mt="1"
                                display="block"
                                w="full"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <Field.RequiredIndicator />
                            {/* <Field.HelperText /> */}
                            <Field.ErrorText>{errors.password_confirmation}</Field.ErrorText>
                        </Field.Root>

                        <Flex alignItems="center" gap="4">
                            <Button type="submit" disabled={processing}>
                                Save password
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <Text fontSize="sm" color="neutral.600">
                                    Saved
                                </Text>
                            </Transition>
                        </Flex>
                    </Box>
                </Box>
            </SettingsLayout>
        </AppLayout>
    );
}
