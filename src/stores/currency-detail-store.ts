import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrency, ICurrencyTickerItemResponse} from "interfaces/currencies";
import {ICurrencyDetailStore, ICurrencyDetailStoreApi} from "interfaces/stores/currency-detail-store";
import {ISettingsStore} from "interfaces/stores/settings-store";
import {action, observable, runInAction, when} from "mobx";

export class CurrencyDetailStore implements ICurrencyDetailStore {

    @observable
    public isLoading = false;

    @observable.ref
    public data: ICurrency;

    @observable
    public fiatCurrency: FiatCurrencyEnum;

    private id: number;
    private api: ICurrencyDetailStoreApi;
    private settingsStore: ISettingsStore;
    private lastlyUsedFiatCurrency?: FiatCurrencyEnum;

    constructor(id: number, api: ICurrencyDetailStoreApi, settingsStore: ISettingsStore) {
        this.id = id;
        this.api = api;
        this.settingsStore = settingsStore;
    }

    @action
    public loadIfNeeded() {
        const settingsFiatCurrency = this.settingsStore.fiatCurrency;

        if (settingsFiatCurrency === this.lastlyUsedFiatCurrency) {
            return;
        }

        // if there is pending request, wait it to complete and then load.
        when(() => !this.isLoading, () => this.loadData());
    }

    @action
    public loadData() {
        if (this.isLoading) { // Prevents spamming and race conditions
            return;
        }

        const settingsFiatCurrency = this.settingsStore.fiatCurrency;

        this.isLoading = true;
        this.lastlyUsedFiatCurrency = settingsFiatCurrency;

        Promise.all<ICurrencyTickerItemResponse>([
            this.api.getCurrency(this.id, settingsFiatCurrency),
            this.api.getCurrency(this.id, "BTC"),
        ]).then((responses) => {
            runInAction(() => {
                this.data = responses[0].data;
                this.data.quotes.BTC = responses[1].data.quotes.BTC;

                this.isLoading = false;
                this.fiatCurrency = settingsFiatCurrency;
            });
        });
    }
}
