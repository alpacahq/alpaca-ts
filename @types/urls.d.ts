import { MarketDataSource } from './entities';
declare const _default: {
    rest: {
        account: string;
        market_data: string;
    };
    websocket: {
        account: string;
        account_paper: string;
        market_data: (source: MarketDataSource) => string;
    };
};
export default _default;
