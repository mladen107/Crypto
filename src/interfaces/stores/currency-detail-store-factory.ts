import {ICurrencyDetailStore} from "./currency-detail-store";

export interface ICurrencyDetailStoreFactory {
    getOrCreateStore(id: number): ICurrencyDetailStore;
}
