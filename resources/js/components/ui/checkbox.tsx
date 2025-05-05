import { Checkbox as CheckboxChakra } from '@chakra-ui/react';
import { CheckIcon } from 'lucide-react';

// function Checkbox({
//   className,
//   ...props
// }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
//   return (
//     <CheckboxPrimitive.Root
//       data-slot="checkbox"
//       className={cn(
//         "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       {...props}
//     >
//       <CheckboxPrimitive.Indicator
//         data-slot="checkbox-indicator"
//         className="flex items-center justify-center text-current transition-none"
//       >
//         <CheckIcon className="size-3.5" />
//       </CheckboxPrimitive.Indicator>
//     </CheckboxPrimitive.Root>
//   )
// }

function Checkbox({ ...props }: CheckboxChakra.RootProps) {
    return (
        <CheckboxChakra.Root data-slot="checkbox" {...props}>
            <CheckboxChakra.Indicator data-slot="checkbox-indicator" flex="initial" alignItems="center" justifyContent="center" transition="none">
                <CheckIcon size="3.5" />
            </CheckboxChakra.Indicator>
        </CheckboxChakra.Root>
    );
}

export { Checkbox };
