import {AxiosPromise} from "axios";
import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrencyTickerCollectionResponse} from "./currencies";

export interface IApi {
    getTopCurrencies(fiatCurrency: FiatCurrencyEnum): AxiosPromise<ICurrencyTickerCollectionResponse>;
}
