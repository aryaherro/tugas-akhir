import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flex, Icon, Link } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        // <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Flex minH="100svh" direction="column" alignItems="center" justify="center" gap="6" p={{ base: 6, md: 10 }}>
            {/* <div className="flex w-full max-w-md flex-col gap-6"> */}
            <Flex w="full" maxW="md" direction="column" gap="6">
                {/* <Link href={route('home')} className="flex items-center gap-2 self-center font-medium"> */}
                <Link href={route('home')} alignItems="center" gap="2" alignSelf="center" fontWeight="medium">
                    {/* <div className="flex h-9 w-9 items-center justify-center"> */}
                    <Flex h="9" w="9" alignItems="center" justifyContent="center">
                        <Icon boxSize="9" fill="current" color={{ base: 'black', _dark: 'white' }}>
                            {/* <AppLogoIcon className="size-9 fill-current text-black dark:text-white" /> */}
                            <AppLogoIcon />
                        </Icon>
                    </Flex>
                    {/* </div> */}
                </Link>
                {/* </Link> */}

                {/* <div className="flex flex-col gap-6"> */}
                <Flex direction="column" gap="6">
                    {/* <Card className="rounded-xl"> */}
                    <Card rounded="xl">
                        <CardHeader px="10" pt="8" pb="0" textAlign="center">
                            <CardTitle fontSize="xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent px="10" py="8">
                            {children}
                        </CardContent>
                    </Card>
                    {/* </Card> */}
                </Flex>
                {/* </div> */}
            </Flex>
            {/* </div> */}
        </Flex>
        // </div>
    );
}
