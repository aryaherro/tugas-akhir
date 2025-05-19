import type { DayStyleConfig } from '@/components/DatePicker/Calendar/type';
import { Center } from '@chakra-ui/react';

type NoneProps = {
    dayStyleConfig: DayStyleConfig;
};

export default function None({ dayStyleConfig }: NoneProps) {
    return <Center m="auto" h={dayStyleConfig.size} w={dayStyleConfig.size} color="white" />;
}
