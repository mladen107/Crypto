import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrency, ICurrencyTickerCollectionResponse} from "interfaces/currencies";

export interface ICurrenciesStoreApi {
    getTopCurrencies(fiatCurrency: FiatCurrencyEnum): Promise<ICurrencyTickerCollectionResponse>;
}

export interface ICurrenciesStore {
    isLoading: boolean;
    data: Map<string, ICurrency>;
    fiatCurrency: FiatCurrencyEnum;

    loadIfNeeded(): void;
    loadData(): void;
}
