import {AxiosPromise} from "axios";
import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrencyTickerCollectionResponse, ICurrencyTickerItemResponse} from "./currencies";

export interface IApi {
    getTopCurrencies(fiatCurrency: FiatCurrencyEnum): AxiosPromise<ICurrencyTickerCollectionResponse>;
    getCurrency(id: number, convert: FiatCurrencyEnum | "BTC"): AxiosPromise<ICurrencyTickerItemResponse>;
}
