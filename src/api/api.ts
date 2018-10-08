import axios from "axios";
import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrencyTickerCollectionResponse, ICurrencyTickerItemResponse} from "interfaces/currencies";
import {ICurrenciesStoreApi} from "interfaces/stores/currencies-store";
import {ICurrencyDetailStoreApi} from "interfaces/stores/currency-detail-store";

const BASE_URL = "https://api.coinmarketcap.com/v2/";

export class Api implements ICurrencyDetailStoreApi, ICurrenciesStoreApi {
    public getTopCurrencies(convert: FiatCurrencyEnum) {
        return axios.get<ICurrencyTickerCollectionResponse>(BASE_URL + "ticker/", {params: {convert}})
            .then((res) => res.data);
    }

    public getCurrency(id: number, convert: FiatCurrencyEnum | "BTC") {
       return axios.get<ICurrencyTickerItemResponse>(BASE_URL + `ticker/${id}/`, {params: {convert}})
            .then((res) => res.data);
    }
}
