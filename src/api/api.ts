import axios from "axios";
import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {IApi} from "interfaces/api";
import {ICurrencyTickerCollectionResponse, ICurrencyTickerItemResponse} from "interfaces/currencies";

const BASE_URL = "https://api.coinmarketcap.com/v2/";

export class Api implements IApi {
    public getTopCurrencies(convert: FiatCurrencyEnum) {
        return axios.get<ICurrencyTickerCollectionResponse>(BASE_URL + "ticker/", {params: {convert}});
    }

    public getCurrency(id: number, convert: FiatCurrencyEnum | "BTC") {
        return axios.get<ICurrencyTickerItemResponse>(BASE_URL + `ticker/${id}/`, {params: {convert}});
    }
}
