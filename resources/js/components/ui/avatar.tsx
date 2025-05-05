import { Avatar as AvatarChakra } from '@chakra-ui/react';

// function Avatar({
//   className,
//   ...props
// }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
//   return (
//     <AvatarPrimitive.Root
//       data-slot="avatar"
//       className={cn(
//         "relative flex size-8 shrink-0 overflow-hidden rounded-full",
//         className
//       )}
//       {...props}
//     />
//   )
// }

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

// function AvatarImage({
//   className,
//   ...props
// }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
//   return (
//     <AvatarPrimitive.Image
//       data-slot="avatar-image"
//       className={cn("aspect-square size-full", className)}
//       {...props}
//     />
//   )
// }

function AvatarImage({ ...props }: AvatarChakra.ImageProps) {
    return <AvatarChakra.Image data-slot="avatar-image" aspectRatio="square" boxSize="full" {...props} />;
}

// function AvatarFallback({
//   className,
//   ...props
// }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
//   return (
//     <AvatarPrimitive.Fallback
//       data-slot="avatar-fallback"
//       className={cn(
//         "bg-muted flex size-full items-center justify-center rounded-full",
//         className
//       )}
//       {...props}
//     />
//   )
// }

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
