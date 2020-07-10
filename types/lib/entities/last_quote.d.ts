export interface LastQuote {
    status: string;
    symbol: string;
    last: {
        askprice: number;
        asksize: number;
        askexchange: number;
        bidprice: number;
        bidsize: number;
        bidexchange: number;
        timestamp: number;
    };
}
