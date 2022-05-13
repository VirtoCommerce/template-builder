import { BaseControlDescriptor } from "./base-control.descriptor";

export interface CalendarDescriptor extends BaseControlDescriptor {
    mode?: 'date' | 'time' | 'datetime';
    showSeconds?: boolean;
    hideSpinners?: boolean;
    showAmPm?: boolean;
    minDate?: Date;
    maxDate?: Date;
    inline?: boolean;
    stepMinute?: number;
}
