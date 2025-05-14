import { Center, Image } from '@chakra-ui/react';
import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <Center>
            <Image src="/rsijs-512.png" />
        </Center>
    );
}
