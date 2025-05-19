import type { DayStyleConfig } from '@/components/DatePicker/Calendar/type';
import { Center, Text, type CenterProps } from '@chakra-ui/react';

type ActiveProps = {
    day?: number | string;
    dayStyleConfig: DayStyleConfig;
} & CenterProps;

export default function Disable({ day, dayStyleConfig, ...props }: ActiveProps) {
    const { size, fontSize } = dayStyleConfig;

    return (
        <Center {...props} m="auto" h={size} w={size} cursor="not-allowed" pos="relative">
            <Text fontSize={fontSize} color="gray.600">
                {day}
            </Text>
        </Center>
    );
}
