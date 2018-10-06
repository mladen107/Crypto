import {ICurrencyDetailStore} from "./currency-detail";

export interface ICurrencyDetailStoreFactory {
    getOrCreateStore(id: number): ICurrencyDetailStore;
}
