import SingleDatePicker, { type SingleDatePickerProps } from '@/components/DatePicker/SingleDatePicker';
import type { PropsWithChildren } from 'react';

import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover';

type SingleDatePickerPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
} & SingleDatePickerProps;

export default function SingleDatePickerPopup({
    isOpen,
    onClose,
    onOpen,
    selectedDate,
    onSetDate,
    datePickerStyle = {},
    children,
}: PropsWithChildren<SingleDatePickerPopupProps>) {
    return (
        <PopoverRoot open={isOpen} onOpenChange={(e) => (e.open ? onOpen() : onClose())}>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <PopoverBody p={0} width="auto">
                    <SingleDatePicker
                        selectedDate={selectedDate}
                        datePickerStyle={datePickerStyle}
                        onSetDate={(date) => {
                            onClose();
                            onSetDate?.(date);
                        }}
                    />
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    );
}
