import { Dialog as DialogChakra, Portal, PortalProps } from '@chakra-ui/react';
import { XIcon } from 'lucide-react';

function Dialog({ ...props }: DialogChakra.RootProps) {
    return <DialogChakra.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogChakra.TriggerProps) {
    return <DialogChakra.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ children, ...props }: PortalProps & any) {
    return (
        <Portal data-slot="dialog-portal" {...props}>
            {children}
        </Portal>
    );
}

function DialogClose({ ...props }: DialogChakra.CloseTriggerProps) {
    return <DialogChakra.CloseTrigger data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ ...props }: DialogChakra.PositionerProps) {
    return (
        <DialogChakra.Positioner
            data-slot="dialog-overlay"
            position="fixe"
            inset="0"
            zIndex="50"
            bg="black/80"
            // className={cn(
            //     'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
            //     className,
            // )}
            {...props}
        />
    );
}

function DialogContent({ children, ...props }: DialogChakra.ContentProps) {
    return (
        <DialogPortal data-slot="dialog-portal">
            <DialogOverlay />
            <DialogChakra.Content
                data-slot="dialog-content"
                gap="4"
                rounded="lg"
                border="ActiveBorder"
                p="6"
                shadow="lg"
                transitionDuration="200"
                maxW={{ sm: 'lg' }}
                {...props}
            >
                {children}
                <DialogClose
                    ringOffsetColor="bg"
                    // className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                >
                    <XIcon />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogChakra.Content>
        </DialogPortal>
    );
}

function DialogHeader({ ...props }: DialogChakra.HeaderProps) {
    return (
        <DialogChakra.Header
            data-slot="dialog-header"
            flex="initial"
            flexDirection="column"
            gap="2"
            textAlign={{ base: 'center', sm: 'left' }}
            {...props}
        />
    );
}

function DialogFooter({ ...props }: DialogChakra.FooterProps) {
    return (
        <DialogChakra.Footer
            data-slot="dialog-footer"
            flex="initial"
            flexDirection={{ base: 'column-reverse', sm: 'row' }}
            justifyContent={{ sm: 'end' }}
            {...props}
        />
    );
}

function DialogTitle({ ...props }: DialogChakra.TitleProps) {
    return <DialogChakra.Title data-slot="dialog-title" fontSize="lg" lineHeight="unset" fontWeight="semibold" {...props} />;
}

function DialogDescription({ ...props }: DialogChakra.DescriptionProps) {
    return <DialogChakra.Description data-slot="dialog-description" fontSize="sm" {...props} />;
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
