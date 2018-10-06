import {FiatCurrencyEnum} from "enums/fiat-currency-enum";

export interface ISettingsStore {
    fiatCurrency: FiatCurrencyEnum;

    setFiatCurrency(currency: FiatCurrencyEnum): void;
}
