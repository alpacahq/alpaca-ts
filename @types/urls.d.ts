import { DataSource } from './entities';
declare const _default: {
    rest: {
        beta: string;
        account: string;
        market_data_v2: string;
        market_data_v1: string;
    };
    websocket: {
        account: string;
        market_data: (source?: DataSource) => string;
    };
};
export default _default;
