import { Asset } from './asset';
export interface Watchlist {
    account_id: string;
    assets: Asset[];
    created_at: string;
    id: string;
    name: string;
    updated_at: string;
}
