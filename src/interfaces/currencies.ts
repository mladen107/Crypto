export interface IQuote {
    price: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    volume_24h: number;
    market_cap: number;
}

export interface IQuotes {
    [key: string]: IQuote;
}

export interface ICurrency {
    id: number;
    name: string;
    rank: number;
    symbol: string;
    total_supply: number;
    max_supply: number;
    quotes: IQuotes;
}

export interface ICurrencyTickerCollectionData {
    [key: string]: ICurrency;
}

export interface ICurrencyTickerCollectionResponse {
    data: ICurrencyTickerCollectionData;
}

export interface ICurrencyTickerItemResponse {
    data: ICurrency;
}
