import {AxiosPromise} from "axios";
import {ICurrencyTickerCollectionResponse} from "./currencies";

export interface IApi {
    getTopCurrencies(): AxiosPromise<ICurrencyTickerCollectionResponse>;
}
