import {IApi} from "interfaces/api";
import {ICurrency} from "interfaces/currencies";
import {action, observable, runInAction} from "mobx";
import {ICurrenciesStore} from "../interfaces/stores/currencies-store";

export class CurrenciesStore implements ICurrenciesStore {

    @observable
    public isLoading = false;

    public data = observable.map<string, ICurrency>();

    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    @action
    public loadData() {
        if (this.isLoading) { // Prevents spamming
            return;
        }
        this.isLoading = true;
        this.api.getTopCurrencies().then(({data}) => {
            runInAction(() => {
                this.data.replace(data.data);
                this.isLoading = false;
            });
        });
    }
}
