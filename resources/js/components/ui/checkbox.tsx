import { Checkbox as CheckboxChakra } from '@chakra-ui/react';
import { CheckIcon } from 'lucide-react';

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
