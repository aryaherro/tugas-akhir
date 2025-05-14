import { Badge as BadgeChakra } from '@chakra-ui/react';
import { cva } from 'class-variance-authority';

import { BadgeBaseProps } from 'node_modules/@chakra-ui/react/dist/types/components/badge/badge';

const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                destructive:
                    'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
                outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Badge({ ...props }: BadgeBaseProps) {
    return (
        <BadgeChakra
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            rounded="md"
            border="initial"
            px="2"
            py="-0.5"
            fontSize="xs"
            fontWeight="medium"
            w="fit"
            whiteSpace="nowrap"
            flexShrink="0"
            overflow="auto"
            data-slot="badge"
            {...props}
        />
    );
}

export { Badge, badgeVariants };
