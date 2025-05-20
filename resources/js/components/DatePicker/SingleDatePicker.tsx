import Calendar from '@/components/DatePicker/Calendar';
import { DayType } from '@/components/DatePicker/Calendar/type';
import Week from '@/components/DatePicker/Week';
import { type DatePickerStyleConfig, defaultDatePickerStyle } from '@/components/DatePicker/type';
import { Box, Center, HStack, IconButton, type IconButtonProps, Text } from '@chakra-ui/react';
import { addMonths, format } from 'date-fns';
import { Struct, pipe } from 'effect';
import { useMemo, useState } from 'react';

export type SingleDatePickerProps = {
    selectedDate: Date;
    onSetDate?: (date: Date) => void;
    datePickerStyle?: Partial<DatePickerStyleConfig>;
};

export default function SingleDatePickerPopup({ selectedDate, onSetDate, datePickerStyle = {} }: SingleDatePickerProps) {
    const [controlDate, setControlDate] = useState(selectedDate);

    const handleNextMonth = () => setControlDate((d) => addMonths(d, 1));

    const handlePrevMonth = () => setControlDate((d) => addMonths(d, -1));

    const mergedDatePickerStyle = useMemo(() => {
        const res = pipe(
            { ...defaultDatePickerStyle, ...datePickerStyle },
            Struct.evolve({
                weekStyle: (style) => ({
                    ...style,
                    ...(datePickerStyle.weekStyle || {}),
                }),
                dayStyle: (style) => ({
                    ...style,
                    ...(datePickerStyle.dayStyle || {}),
                }),
            }),
        );

        return res;
    }, [datePickerStyle]);

    const btnBaseStyle: Omit<IconButtonProps, 'aria-label'> = {
        bgColor: 'transparent',
        color: mergedDatePickerStyle.color,
        variant: 'ghost',
        _hover: {},
        _active: {},
        _focus: {},
    };

    const handleDayRulesFn = (date: Date): DayType => {
        if (format(date, 'yyyy/MM/dd') === format(selectedDate, 'yyyy/MM/dd')) {
            return DayType.ACTIVE;
        }

        return DayType.NORMAL;
    };

    return (
        <Box bgColor={mergedDatePickerStyle.bgColor} borderRadius="5px">
            <Center>
                <HStack m="auto">
                    <IconButton {...btnBaseStyle} aria-label="prev month" onClick={handlePrevMonth} />
                    <Text minW="6rem" textAlign="center" color={mergedDatePickerStyle.color}>
                        {format(controlDate, 'MMMM')}
                    </Text>
                    <IconButton {...btnBaseStyle} aria-label="next month" onClick={handleNextMonth} />
                </HStack>
            </Center>
            <Week p={2} weekStyleConfig={mergedDatePickerStyle.weekStyle} />
            <Calendar
                year={controlDate.getFullYear()}
                month={controlDate.getMonth()}
                onSetDate={onSetDate}
                onGetDayTypeRulesFn={handleDayRulesFn}
                dayStyleConfig={mergedDatePickerStyle.dayStyle}
                p={2}
            />
        </Box>
    );
}
