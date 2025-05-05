import { Collapsible as CollapsibleChakra } from '@chakra-ui/react';

function Collapsible({ ...props }: CollapsibleChakra.RootProps) {
    return <CollapsibleChakra.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: CollapsibleChakra.TriggerProps) {
    return <CollapsibleChakra.Trigger data-slot="collapsible-trigger" {...props} />;
}

function CollapsibleContent({ ...props }: CollapsibleChakra.ContentProps) {
    return <CollapsibleChakra.Content data-slot="collapsible-content" {...props} />;
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
