/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActivityType } from './ActivityType';

export type NonTradeActivities = {
    activity_type?: ActivityType;
    /**
     * An ID for the activity, always in “::” format. Can be sent as page_token in requests to facilitate the paging of results.
     */
    id?: string;
    /**
     * The date on which the activity occurred or on which the transaction associated with the activity settled.
     */
    date?: string;
    /**
     * The net amount of money (positive or negative) associated with the activity.
     */
    net_amount?: string;
    /**
     * The symbol of the security involved with the activity. Not present for all activity types.
     */
    symbol?: string;
    /**
     * For dividend activities, the number of shares that contributed to the payment. Not present for other activity types.
     *
     */
    qty?: string;
    /**
     * For dividend activities, the average amount paid per share. Not present for other activity types.
     */
    per_share_amount?: string;
};

