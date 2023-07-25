/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bar } from './Bar';

/**
 * A model representing the result of hitting the Latest Multi Bars api; represents the latest Bars for multiple symbols.
 *
 */
export type LatestMultiBarsResponse = {
    bars: Record<string, Bar>;
};

