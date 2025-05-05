import { Breadcrumb as BreadcrumbChakra, VisuallyHidden } from '@chakra-ui/react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

// function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
//   return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
// }

function Breadcrumb({ ...props }: BreadcrumbChakra.RootProps) {
    return <BreadcrumbChakra.Root aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ ...props }: BreadcrumbChakra.ListProps) {
    return (
        <BreadcrumbChakra.List
            data-slot="breadcrumb-list"
            flex="initial"
            flexWrap="wrap"
            alignItems="center"
            gap={{ base: '1.5', sm: '2.5' }}
            fontSize="sm"
            wordBreak="break-word"
            {...props}
        />
    );
}


function BreadcrumbItem({ ...props }: BreadcrumbChakra.ItemProps) {
    return <BreadcrumbChakra.Item data-slot="breadcrumb-item" display="inline-flex" alignItems="center" gap="1.5" {...props} />;
}

function BreadcrumbLink({ ...props }: BreadcrumbChakra.LinkProps) {
    return <BreadcrumbChakra.Link data-slot="breadcrumb-link" transition="colors" {...props} />;
}

function BreadcrumbPage({ ...props }: BreadcrumbChakra.CurrentLinkProps) {
    return (
        <BreadcrumbChakra.CurrentLink
            data-slot="breadcrumb-page"
            role="link"
            aria-disabled="true"
            aria-current="page"
            fontWeight="normal"
            {...props}
        />
    );
}


function BreadcrumbSeparator({ children, ...props }: BreadcrumbChakra.SeparatorProps) {
    return (
        <BreadcrumbChakra.Separator data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" {...props}>
            {children ?? <ChevronRight />}
        </BreadcrumbChakra.Separator>
    );
}

function BreadcrumbEllipsis({ ...props }: BreadcrumbChakra.EllipsisProps) {
    return (
        <BreadcrumbChakra.Ellipsis
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            flex="initial"
            boxSize="9"
            alignItems="center"
            justifyContent="center"
            {...props}
        >
            <MoreHorizontal size="4" />
            <VisuallyHidden>More</VisuallyHidden>
        </BreadcrumbChakra.Ellipsis>
    );
}

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
