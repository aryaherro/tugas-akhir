import { Grid, Text } from '@chakra-ui/react';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <Grid ml="1" flex="auto" textAlign="left" fontSize="sm">
                <Text mb="0.5" truncate lineHeight="1" fontWeight="semibold">
                    Laravel Starter Kit
                </Text>
            </Grid>
        </>
    );
}
