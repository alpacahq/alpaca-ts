/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Snapshot } from "./Snapshot";

/**
 * A model representing the result of hitting the Multi Snapshots api; represents Snapshots for multiple symbols.
 *
 * The result is an object whose keys are the requested symbols and values are their respecitve Snapshot
 *
 */
export type MultiSnapshotResponse = Record<string, Snapshot>;
