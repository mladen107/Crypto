import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrency} from "../currencies";

export interface ICurrenciesStore {
    isLoading: boolean;
    data: Map<string, ICurrency>;
    fiatCurrency: FiatCurrencyEnum;

    loadIfNeeded(): void;
    loadData(): void;
}
