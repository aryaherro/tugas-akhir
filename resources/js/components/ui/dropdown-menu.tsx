import { Flex, Menu, Portal, PortalProps } from '@chakra-ui/react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

function DropdownMenu({ ...props }: Menu.RootProps) {
    return <Menu.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: PortalProps) {
    return <Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: Menu.TriggerProps) {
    return <Menu.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({ sideOffset = 4, ...props }: Menu.ContentProps & any) {
    return (
        <Portal>
            <Menu.Content
                data-slot="dropdown-menu-content"
                sideOffset={sideOffset}
                zIndex="50"
                minW="8rem"
                overflow="hidden"
                rounded="md"
                border="initial"
                p="1"
                shadow="md"
                {...props}
            />
        </Portal>
    );
}

function DropdownMenuGroup({ ...props }: Menu.ItemGroupProps) {
    return <Menu.ItemGroup data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem({
    inset,
    variant = 'default',
    children,
    ...props
}: Menu.ItemProps & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}) {
    return (
        <Menu.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            data-variant={variant}
            // className={cn(
            //   "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            //   className
            // )}
            {...props}
        >
            {children}
            </Menu.Item>
    );
}

function DropdownMenuCheckboxItem({ children, checked, ...props }: Menu.CheckboxItemProps) {
    return (
        <Menu.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            position="relative"
            flex="initial"
            cursor="default"
            alignItems="center"
            gap="2"
            rounded="sm"
            py="1.5"
            pr="2"
            pl="8"
            fontSize="sm"
            outline="hidden"
            // className={cn(
            //   "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            //   className
            // )}
            checked={checked}
            {...props}
        >
            <Flex pointerEvents="none" position="absolute" left="2" boxSize="3.5" alignItems="center" justifyContent="center">
                <Menu.ItemIndicator>
                    <CheckIcon size="4" />
                </Menu.ItemIndicator>
            </Flex>
            {children}
        </Menu.CheckboxItem>
    );
}

function DropdownMenuRadioGroup({ ...props }: Menu.RadioItemGroupProps) {
    return <Menu.RadioItemGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({ children, ...props }: Menu.RadioItemProps) {
    return (
        <Menu.RadioItem
            data-slot="dropdown-menu-radio-item"
            position="relative"
            flex="initial"
            cursor="default"
            alignItems="center"
            gap="2"
            rounded="sm"
            py="1.5"
            pr="2"
            pl="8"
            fontSize="sm"
            outline="hidden"
            // className={cn(
            //     "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            //     className,
            // )}
            {...props}
        >
            <Flex pointerEvents="none" position="absolute" left="2" boxSize="3.5" alignItems="center" justifyContent="center">
                <Menu.ItemIndicator>
                    <CircleIcon size="2" fill="current" />
                </Menu.ItemIndicator>
            </Flex>
            {children}
        </Menu.RadioItem>
    );
}

function DropdownMenuLabel({
    inset,
    ...props
}: Menu.ItemGroupLabelProps & {
    inset?: boolean;
}) {
    return (
        <Menu.ItemGroupLabel
            data-slot="dropdown-menu-label"
            data-inset={inset}
            px="2"
            py="1.5"
            fontWeight="medium"
            // className={cn('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className)}
            {...props}
        />
    );
}

function DropdownMenuSeparator({ ...props }: Menu.SeparatorProps) {
    return <Menu.Separator data-slot="dropdown-menu-separator" bg="border" mx="-1" my="1" h="1px" {...props} />;
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
    return <span data-slot="dropdown-menu-shortcut" className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)} {...props} />;
}

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
    return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}) {
    return (
        <DropdownMenuPrimitive.SubTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            className={cn(
                'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8',
                className,
            )}
            {...props}
        >
            {children}
            <ChevronRightIcon className="ml-auto size-4" />
        </DropdownMenuPrimitive.SubTrigger>
    );
}

function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
    return (
        <DropdownMenuPrimitive.SubContent
            data-slot="dropdown-menu-sub-content"
            className={cn(
                'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
                className,
            )}
            {...props}
        />
    );
}

export {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
};
