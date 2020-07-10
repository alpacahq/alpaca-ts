export interface GetOrders {
    status?: string;
    limit?: number;
    after?: Date;
    until?: Date;
    direction?: string;
    nested?: boolean;
}
