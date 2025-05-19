import { DayType } from '@/components/DatePicker/Calendar/type';
import { addDays, getDate, getMonth, getYear, startOfWeek } from 'date-fns';

import { Equal, pipe, Array as ReadonlyArray } from 'effect';

export type DateRulesFn = (date: Date) => DayType;

export default function dayListGenerator(
    year: number,
    month: number,
    dateTypeRuleFn: DateRulesFn,
): Array<{
    date: Date;
    year: number;
    month: number;
    day: number;
    dayType: DayType;
}> {
    const startDate = startOfWeek(new Date(year, month, 1));

    return pipe(
        42,
        ReadonlyArray.makeBy((index) => addDays(startDate, index)),
        ReadonlyArray.map((date) => ({
            date,
            year: getYear(date),
            month: getMonth(date),
            day: getDate(date),
            dayType: Equal.equals(getMonth(date), month) && Equal.equals(getYear(date), year) ? dateTypeRuleFn(date) : DayType.NONE,
        })),
    );
}
