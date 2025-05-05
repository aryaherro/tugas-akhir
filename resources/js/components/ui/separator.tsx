import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { Separator as SeparatorChakra, SeparatorProps } from "@chakra-ui/react"

import { cn } from "@/lib/utils"

function Separator({
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorChakra
      data-slot="separator-root"
      orientation={orientation}
      bg="border"
      flexShrink="0"
      {...props}
    />
  )
}

export { Separator }
