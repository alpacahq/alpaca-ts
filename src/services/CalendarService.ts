/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Calendar } from '../models/Calendar';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CalendarService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Market Calendar info
     * The calendar API serves the full list of market days from 1970 to 2029. It can also be queried by specifying a start and/or end time to narrow down the results. In addition to the dates, the response also contains the specific open and close times for the market days, taking into account early closures.
     *
     * Returns the market calendar.
     * @returns Calendar OK
     * @throws ApiError
     */
    public getCalendar({
        start,
        end,
        dateType,
    }: {
        /**
         * The first date to retrieve data for (inclusive)
         */
        start?: string,
        /**
         * The last date to retrieve data for (inclusive)
         */
        end?: string,
        /**
         * Indicates what start and end mean. Enum: ‘TRADING’ or ‘SETTLEMENT’. Default value is ‘TRADING’. If TRADING is specified, returns a calendar whose trading date matches start, end. If SETTLEMENT is specified, returns the calendar whose settlement date matches start and end.
         */
        dateType?: string,
    }): CancelablePromise<Array<Calendar>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v2/calendar',
            query: {
                'start': start,
                'end': end,
                'date_type': dateType,
            },
        });
    }

}
