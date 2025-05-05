import { Box, Heading as HeadingChakra, Text } from '@chakra-ui/react';

export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <Box mb="8" spaceY="0.5">
            <HeadingChakra as="h2" fontSize="xl" fontWeight="semibold" letterSpacing="tight">
                {title}
            </HeadingChakra>
            {description && <Text fontSize="sm">{description}</Text>}
        </Box>
    );
}
