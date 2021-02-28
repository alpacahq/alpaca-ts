import { DataSource } from './entities';
declare const _default: {
    rest: {
        account: string;
        market_data: string;
    };
    websocket: {
        account: string;
        market_data: (source?: DataSource) => string;
    };
};
export default _default;
