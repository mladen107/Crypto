import {IApi} from "interfaces/api";
import {ICurrencyDetailStoreFactory} from "interfaces/stores/currency-detail-store-factory";
import {ISettingsStore} from "interfaces/stores/settings-store";
import {CurrencyDetailStore} from "./currency-detail-store";

export class CurrencyDetailStoreFactory implements ICurrencyDetailStoreFactory {
    private readonly api: IApi;
    private readonly settingsStore: ISettingsStore;
    private cache = new Map<number, CurrencyDetailStore>();

    constructor(api: IApi, settingsStore: ISettingsStore) {
        this.api = api;
        this.settingsStore = settingsStore;
    }

    public getOrCreateStore(id: number) {
        let store = this.cache.get(id);
        if (!store) {
            store = new CurrencyDetailStore(id, this.api, this.settingsStore);
            this.cache.set(id, store);
        }

        return store;
    }
}
