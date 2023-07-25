/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bar } from './Bar';

/**
 * A model representing the result of hitting one of the Latest Bar api endpoints.
 *
 * Represents a single Bar that should be the latest Bar data for a given ticker symbol
 */
export type LatestBarResponse = {
    symbol: string;
    bar: Bar;
};

