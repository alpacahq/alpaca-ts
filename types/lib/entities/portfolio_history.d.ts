export interface PortfolioHistory {
    timestamp: number[];
    equity: number[];
    profit_loss: number[];
    profit_loss_pct: number[];
    base_value: number;
    timeframe: string;
}
