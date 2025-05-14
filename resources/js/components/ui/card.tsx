import { Card as CardChakra } from '@chakra-ui/react';

function Card(
    { ...props }: CardChakra.RootProps,
) {
    return (
        
        <CardChakra.Root
            data-slot="card"
            flex="initial"
            flexDirection="column"
            gap="6"
            rounded="xl"
            border="ActiveBorder"
            py="6"
            shadow="sm"
            {...props}
        />
    );
}

function CardHeader(
    { ...props }: CardChakra.HeaderProps,
) {
    return (
        <CardChakra.Header data-slot="card-header" flex="initial" flexDirection="column" gap="1.5" px="6" {...props} />
    );
}

function CardTitle(
    { ...props }: CardChakra.TitleProps,
) {
    return (
        <CardChakra.Title data-slot="card-title" lineHeight="unset" fontWeight="semibold" {...props} />
    );
}

function CardDescription(
    { ...props }: CardChakra.DescriptionProps,
) {
    return (
        <CardChakra.Description data-slot="card-description" fontSize="sm" {...props} />
    );
}

function CardContent(
    { ...props }: CardChakra.BodyProps,
) {
    return (
        <CardChakra.Body data-slot="card-content" px="6" {...props} />
    );
}

function CardFooter(
    { ...props }: CardChakra.FooterProps,
) {
    return (
        <CardChakra.Footer data-slot="card-footer" flex="initial" alignItems="center" px="6" {...props} />
    );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
