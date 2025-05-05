import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

// import { Button } from '@/components/ui/button';

import HeadingSmall from '@/components/heading-small';

// import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PasswordInput } from '@/components/ui/password-input';
import { Box, Button, Dialog, Field, Flex, Grid, Text } from '@chakra-ui/react';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <Box spaceY="6" className="space-y-6">
            <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
            <Box spaceY="4" rounded="lg" border={{ base: 'red.100', _dark: '200' }} bg={{ base: 'red.50', _dark: '700' }} p="4">
                <Text pos="relative" spaceY="0.5" color={{ base: 'red.600', _dark: 'red.100' }}>
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
                </Text>

                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button bgColor="red" textDecorationColor="white" shadow="xs">
                            Delete account
                        </Button>
                    </Dialog.Trigger>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.CloseTrigger />
                            <Dialog.Header>
                                <Dialog.Title>Are you sure you want to delete your account?</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Dialog.Description>
                                    Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your
                                    password to confirm you would like to permanently delete your account.
                                </Dialog.Description>
                                <Box as="form" spaceY="6" onSubmit={deleteUser}>
                                    <Field.Root as={Grid} gap="2">
                                        <Flex alignItems="center">
                                            <Field.Label htmlFor="password">Password</Field.Label>
                                        </Flex>
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
                                </Box>
                            </Dialog.Body>

                            <Dialog.Footer gap="4">
                                <Dialog.ActionTrigger asChild>
                                    <Button bg="secondary" shadow="xs" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </Dialog.ActionTrigger>
                                <Button
                                    //  variant="destructive"
                                    bgColor="red"
                                    textDecorationColor="white"
                                    shadow="xs"
                                    disabled={processing}
                                    asChild
                                    type="submit"
                                >
                                    Delete account
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            </Box>
        </Box>
    );
}
