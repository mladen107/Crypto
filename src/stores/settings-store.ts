import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ISettingsStore} from "interfaces/stores/settings-store";
import {action, observable} from "mobx";
import {DEFAULT_FIAT_CURRENCY, FIAT_CURRENCY_LS_KEY} from "../constants";

export class SettingsStore implements ISettingsStore {

    @observable
    public fiatCurrency: FiatCurrencyEnum;

    constructor() {
        const savedFiatCurrency = window.localStorage.getItem(FIAT_CURRENCY_LS_KEY) as FiatCurrencyEnum;
        this.fiatCurrency = savedFiatCurrency || DEFAULT_FIAT_CURRENCY;
    }

    @action
    public setFiatCurrency(currency: FiatCurrencyEnum) {
        this.fiatCurrency = currency;
        window.localStorage.setItem(FIAT_CURRENCY_LS_KEY, currency);
    }

}
