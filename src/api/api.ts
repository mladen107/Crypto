import axios from "axios";
import {ICurrencyTickerCollectionResponse} from "interfaces/currencies";
import {IApi} from "../interfaces/api";

const BASE_URL = "https://api.coinmarketcap.com/v2/";

export class Api implements IApi {
    public getTopCurrencies() {
        return axios.get<ICurrencyTickerCollectionResponse>(BASE_URL + "ticker/");
    }
}
