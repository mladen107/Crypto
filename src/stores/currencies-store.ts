import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrency} from "interfaces/currencies";
import {ICurrenciesStore, ICurrenciesStoreApi} from "interfaces/stores/currencies-store";
import {ISettingsStore} from "interfaces/stores/settings-store";
import {action, observable, runInAction, when} from "mobx";

export class CurrenciesStore implements ICurrenciesStore {

    @observable
    public isLoading = false;

    @observable
    public fiatCurrency: FiatCurrencyEnum;

    public data = observable.map<string, ICurrency>({}, {deep: false});

    private api: ICurrenciesStoreApi;
    private settingsStore: ISettingsStore;
    private lastlyUsedFiatCurrency?: FiatCurrencyEnum;

    constructor(api: ICurrenciesStoreApi, settingsStore: ISettingsStore) {
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

        this.api.getTopCurrencies(settingsFiatCurrency).then(({data}) => {
            runInAction(() => {
                this.data.replace(data);
                this.isLoading = false;
                this.fiatCurrency = settingsFiatCurrency;
            });
        });
    }
}
