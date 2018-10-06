import {FiatCurrencyEnum} from "enums/fiat-currency-enum";

export interface IQuote {
    price: number;
    percent_change_24h: number;
}

export type TQuotes = {
    [P in FiatCurrencyEnum]?: IQuote;
};

export interface ICurrency {
    id: number;
    name: string;
    rank: number;
    symbol: string;
    quotes: TQuotes;
}

export interface ICurrencyTickerCollectionData {
    [key: string]: ICurrency;
}

export interface ICurrencyTickerCollectionResponse {
    data: ICurrencyTickerCollectionData;
}
