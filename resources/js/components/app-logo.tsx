import { Flex, Grid, Icon, Text } from '@chakra-ui/react';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <Flex aspectRatio="square" boxSize="8" alignItems="center" justifyContent="center" rounded="md">
                <Icon boxSize="5">
                    <AppLogoIcon />
                </Icon>
            </Flex>
            <Grid ml="1" flex="auto" textAlign="left" fontSize="sm">
                <Text mb="0.5" truncate lineHeight="1" fontWeight="semibold">
                    Layanan Transportasi
                </Text>
            </Grid>
        </>
    );
}
