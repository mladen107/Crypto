import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrency, ICurrencyTickerItemResponse} from "interfaces/currencies";

export interface ICurrencyDetailStoreApi {
    getCurrency(id: number, convert: FiatCurrencyEnum | "BTC"): Promise<ICurrencyTickerItemResponse>;
}

export interface ICurrencyDetailStore {
    isLoading: boolean;
    data: ICurrency;
    fiatCurrency: FiatCurrencyEnum;

    loadIfNeeded(): void;
    loadData(): void;
}
