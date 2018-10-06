import {IApi} from "interfaces/api";
import {ICurrency} from "interfaces/currencies";
import {action, observable, runInAction, when} from "mobx";
import {Simulate} from "react-dom/test-utils";
import {FiatCurrencyEnum} from "../enums/fiat-currency-enum";
import {ICurrenciesStore} from "../interfaces/stores/currencies-store";
import {ISettingsStore} from "../interfaces/stores/settings-store";
import loadedData = Simulate.loadedData;

export class CurrenciesStore implements ICurrenciesStore {

    @observable
    public isLoading = false;

    @observable
    public fiatCurrency: FiatCurrencyEnum;

    public data = observable.map<string, ICurrency>();

    private api: IApi;
    private settingsStore: ISettingsStore;
    private lastlyUsedFiatCurrency?: FiatCurrencyEnum;

    constructor(api: IApi, settingsStore: ISettingsStore) {
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
        if (this.isLoading) { // Prevents spamming
            return;
        }

        const settingsFiatCurrency = this.settingsStore.fiatCurrency;

        this.isLoading = true;
        this.lastlyUsedFiatCurrency = settingsFiatCurrency;

        this.api.getTopCurrencies(settingsFiatCurrency).then(({data}) => {
            runInAction(() => {
                this.data.replace(data.data);
                this.isLoading = false;
                this.fiatCurrency = settingsFiatCurrency;
            });
        });
    }
}
