import { Avatar as AvatarChakra } from '@chakra-ui/react';


function Avatar({ ...props }: AvatarChakra.RootProps) {
    return (
        <AvatarChakra.Root
            data-slot="avatar"
            position="relative"
            flex="initial"
            boxSize="8"
            flexShrink="unset"
            overflow="hidden"
            rounded="full"
            {...props}
        />
    );
}


function AvatarImage({ ...props }: AvatarChakra.ImageProps) {
    return <AvatarChakra.Image data-slot="avatar-image" aspectRatio="square" boxSize="full" {...props} />;
}


function AvatarFallback({ ...props }: AvatarChakra.FallbackProps) {
    return (
        <AvatarChakra.Fallback
            data-slot="avatar-fallback"
            flex="initial"
            boxSize="full"
            alignItems="center"
            justifyContent="center"
            rounded="full"
            {...props}
        />
    );
}

export { Avatar, AvatarFallback, AvatarImage };
