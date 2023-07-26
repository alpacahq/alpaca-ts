/**
 * An enum representing the various possible account status values.
 *
 * Most likely, the account status is ACTIVE unless there is any problem. The account status may get in ACCOUNT_UPDATED when personal information is being updated from the dashboard, in which case you may not be allowed trading for a short period of time until the change is approved.
 *
 * - ONBOARDING
 * The account is onboarding.
 * - SUBMISSION_FAILED
 * The account application submission failed for some reason.
 * - SUBMITTED
 * The account application has been submitted for review.
 * - ACCOUNT_UPDATED
 * The account information is being updated.
 * - APPROVAL_PENDING
 * The final account approval is pending.
 * - ACTIVE
 * The account is active for trading.
 * - REJECTED
 * The account application has been rejected.
 */
export enum AccountStatus {
  ONBOARDING = "ONBOARDING",
  SUBMISSION_FAILED = "SUBMISSION_FAILED",
  SUBMITTED = "SUBMITTED",
  ACCOUNT_UPDATED = "ACCOUNT_UPDATED",
  APPROVAL_PENDING = "APPROVAL_PENDING",
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
}
