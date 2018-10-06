import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrency} from "interfaces/currencies";

export interface ICurrencyDetailStore {
    isLoading: boolean;
    data: ICurrency;
    fiatCurrency: FiatCurrencyEnum;

    loadIfNeeded(): void;
    loadData(): void;
}
