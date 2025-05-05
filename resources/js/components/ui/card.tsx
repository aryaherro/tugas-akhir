import { Card as CardChakra } from '@chakra-ui/react';

function Card(
    { ...props }: CardChakra.RootProps,
    // React.ComponentProps<"div">
) {
    return (
        // <div
        //   data-slot="card"
        //   className={cn(
        //     "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        //     className
        //   )}
        //   {...props}
        // />
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
    // React.ComponentProps<"div">
) {
    return (
        // <div
        //   data-slot="card-header"
        //   className={cn("flex flex-col gap-1.5 px-6", className)}
        //   {...props}
        // />
        <CardChakra.Header data-slot="card-header" flex="initial" flexDirection="column" gap="1.5" px="6" {...props} />
    );
}

function CardTitle(
    { ...props }: CardChakra.TitleProps,
    // React.ComponentProps<"div">
) {
    return (
        // <div
        //   data-slot="card-title"
        //   className={cn("leading-none font-semibold", className)}
        //   {...props}
        // />
        <CardChakra.Title data-slot="card-title" lineHeight="unset" fontWeight="semibold" {...props} />
    );
}

function CardDescription(
    { ...props }: CardChakra.DescriptionProps,
    // React.ComponentProps<"div">
) {
    return (
        // <div
        //   data-slot="card-description"
        //   className={cn("text-muted-foreground text-sm", className)}
        //   {...props}
        // />
        <CardChakra.Description data-slot="card-description" fontSize="sm" {...props} />
    );
}

function CardContent(
    { ...props }: CardChakra.BodyProps,
    // React.ComponentProps<"div">
) {
    return (
        // <div
        //   data-slot="card-content"
        //   className={cn("px-6", className)}
        //   {...props}
        // />
        <CardChakra.Body data-slot="card-content" px="6" {...props} />
    );
}

function CardFooter(
    { ...props }: CardChakra.FooterProps,
    // React.ComponentProps<"div">
) {
    return (
        // <div
        //   data-slot="card-footer"
        //   className={cn("flex items-center px-6", className)}
        //   {...props}
        // />
        <CardChakra.Footer data-slot="card-footer" flex="initial" alignItems="center" px="6" {...props} />
    );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
