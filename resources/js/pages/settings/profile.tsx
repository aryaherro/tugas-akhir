import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
// import { Button } from '@/components2/ui/button';
// import { Input } from '@/components2/ui/input';
// import { Label } from '@/components2/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Box, Button, Field, Flex, Grid, Input, Text } from '@chakra-ui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <Box spaceY="6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />
                    <Box as="form" spaceY="6" onSubmit={submit}>
                        <Field.Root as={Grid} gap="2">
                            <Field.Label htmlFor="name">Name</Field.Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Full name"
                                mt="1"
                                display="block"
                                w="full"
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
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email address"
                                mt="1"
                                display="block"
                                w="full"
                            />
                            <Field.RequiredIndicator />
                            {/* <Field.HelperText /> */}
                            <Field.ErrorText mt="2">{errors.email}</Field.ErrorText>
                        </Field.Root>
                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Text textUnderlinePosition="under">
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </Text>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <Text mt="2" fontSize="sm" fontWeight="medium" color="green.600">
                                        A new verification link has been sent to your email address.
                                    </Text>
                                )}
                            </div>
                        )}

                        <Flex alignItems="center" gap="4">
                            <Button type="submit" disabled={processing}>
                                Save
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

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
