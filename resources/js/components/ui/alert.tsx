import { Alert as AlertChakra } from '@chakra-ui/react';
import { cva } from 'class-variance-authority';

const alertVariants = cva(
    'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                destructive: 'text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);



function Alert({ ...props }: AlertChakra.RootProps) {
    return (
        <AlertChakra.Root
            position="relative"
            w="full"
            rounded="lg"
            border="initial"
            px="4"
            py="3"
            fontSize="sm"
            grid="unset"
            gridColumn="unset"
            alignItems="start"
            data-slot="alert"
            role="alert"
            bgColor="Background"
            {...props}
        />
    );
}

function AlertTitle({ ...props }: AlertChakra.TitleProps) {
    return (
        <AlertChakra.Title
            position="relative"
            w="full"
            rounded="lg"
            border="initial"
            px="4"
            py="3"
            grid="unset"
            gridColumn="unset"
            alignItems="start"
            data-slot="alert-title"
            gridColumnStart="2"
            lineClamp="1"
            minH="4"
            fontSize="medium"
            letterSpacing="tight"
            {...props}
        />
    );
}

function AlertDescription({ ...props }: AlertChakra.DescriptionProps) {
    return (
        <AlertChakra.Description
            position="relative"
            w="full"
            rounded="lg"
            border="initial"
            px="4"
            py="3"
            grid="unset"
            gridColumn="unset"
            alignItems="start"
            data-slot="alert-description"
            gridColumnStart="2"
            justifyItems="start"
            gap="1"
            fontSize="sm"
            {...props}
        />
    );
}

export { Alert, AlertDescription, AlertTitle };
