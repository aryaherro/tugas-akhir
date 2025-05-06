import { Box, Heading, Text } from '@chakra-ui/react';

export default function HeadingSmall({ title, description }: { title: string; description?: string }) {
    return (
        <Box as="header">
            <Heading as="h3" mb="0.5" fontSize="1rem" fontWeight="medium">
                {title}
            </Heading>
            {description && (
                <Text fontSize="sm" color={{ base: 'bg.muted', _dark: 'white' }}>
                    {description}
                </Text>
            )}
        </Box>
    );
}
