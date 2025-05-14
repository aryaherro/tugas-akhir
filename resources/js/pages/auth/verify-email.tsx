// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import { Box, Button, Text } from '@chakra-ui/react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <Text mb={4} textAlign="center" fontSize="sm" fontWeight="medium" color="green.600">
                    A new verification link has been sent to the email address you provided during registration.
                </Text>
            )}

            <Box as="form" onSubmit={submit} spaceY={6} textAlign="center">
                <Button disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                <Button mx="auto" display="block" fontSize="sm" onClick={() => (window.location.href = route('logout'))}>
                    Log out
                </Button>
            </Box>
        </AuthLayout>
    );
}
