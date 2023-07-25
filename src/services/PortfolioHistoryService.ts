/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PortfolioHistory } from '../models/PortfolioHistory';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PortfolioHistoryService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Account Portfolio History
     * Returns timeseries data about equity and profit/loss (P/L) of the account in requested timespan.
     * @returns PortfolioHistory Successful response
     * @throws ApiError
     */
    public getAccountPortfolioHistory({
        period,
        timeframe,
        dateEnd,
        extendedHours,
    }: {
        /**
         * The duration of the data in <number> + <unit>, such as 1D, where <unit> can be D for day, W for week, M for month and A for year. Defaults to 1M.
         */
        period?: string,
        /**
         * The resolution of time window. 1Min, 5Min, 15Min, 1H, or 1D. If omitted, 1Min for less than 7 days period, 15Min for less than 30 days, or otherwise 1D.
         */
        timeframe?: string,
        /**
         * The date the data is returned up to, in “YYYY-MM-DD” format. Defaults to the current market date (rolls over at the market open if extended_hours is false, otherwise at 7am ET)
         */
        dateEnd?: string,
        /**
         * If true, include extended hours in the result. This is effective only for timeframe less than 1D.
         */
        extendedHours?: string,
    }): CancelablePromise<PortfolioHistory> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v2/account/portfolio/history',
            query: {
                'period': period,
                'timeframe': timeframe,
                'date_end': dateEnd,
                'extended_hours': extendedHours,
            },
        });
    }

}
