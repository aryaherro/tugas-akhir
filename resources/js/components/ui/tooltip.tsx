import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { Tooltip as TooltipChakra, Portal } from "@chakra-ui/react"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: TooltipChakra.RootProviderProps & any) {
  return (
    <TooltipChakra.RootProvider data-slot="tooltip-provider" delayDuration={delayDuration} {...props}/>
  )
}

function Tooltip({
  ...props
}: TooltipChakra.RootProps) {
  return (
    <TooltipProvider>
      <TooltipChakra.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: TooltipChakra.TriggerProps) {
  return <TooltipChakra.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  sideOffset = 4,
  children,
  ...props
}: TooltipChakra.ContentProps & any) {
  return (
    <Portal >
      <TooltipChakra.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        colorScheme="primary"
        textDecorationColor="primary-foreground"
        // animation="ease-in"
        _open={{animation: "fade-in-0 zoom-in-95"}}
        _closed={{animation:"fade-out-0 zoom-out-95"}}
        maxW="sm"
        rounded="md"
        px="3"
        py="1.5"
        fontSize="xs"
        // className={cn(
        //   "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-w-sm rounded-md px-3 py-1.5 text-xs",
        // )}
        {...props}
      >
        {children}
        <TooltipChakra.Arrow bg="primary" fill="primary" zIndex="50" boxSize="2.5" translateY="calc(-50%_-_2px)" rotate="45" rounded="2px" />
      </TooltipChakra.Content>
    </Portal >
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
