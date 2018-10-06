import {Page} from "components/page";
import {ICurrencyDetailStoreFactory} from "interfaces/stores/currency-detail-store-factory";
import {inject, observer} from "mobx-react";
import * as React from "react";
import * as style from "./currency-detail.scss";

interface ICurrencyDetailProps {
    id: string;
    currencyDetailStoreFactory?: ICurrencyDetailStoreFactory;
}

@inject((allStores: any) => ({
    currencyDetailStoreFactory: allStores.currencyDetailStoreFactory as ICurrencyDetailStoreFactory,
}))
@observer
export class CurrencyDetail extends React.Component<ICurrencyDetailProps> {
    public render() {
        const store = this.getStore();
        const data = store.data;
        const fiatCurrency = store.fiatCurrency;

        return <Page hasBackButton title={data && data.name} hasRefresh onRefreshClick={this.handleRefresh}>
            <div className={style.container}>
                {this.renderItem("Rank", data && data.rank)}
                {this.renderItem("Name", data && data.name)}
                {this.renderItem("Symbol", data && data.symbol)}
                {this.renderItem(`Price(${fiatCurrency})`, data && data.quotes[fiatCurrency].price)}
                {this.renderItem(`24h Volume (${fiatCurrency})`, data && data.quotes[fiatCurrency].volume_24h)}
                {this.renderItem(`Market Cap (${fiatCurrency})`, data && data.quotes[fiatCurrency].market_cap)}
                {this.renderItem("Price (BTC)", data && data.quotes.BTC.price)}
                {this.renderItem("1h Change (%)", data && data.quotes[fiatCurrency].percent_change_1h)}
                {this.renderItem("24h Change (%)", data && data.quotes[fiatCurrency].percent_change_24h)}
                {this.renderItem("7d Change (%)", data && data && data.quotes[fiatCurrency].percent_change_7d)}
                {this.renderItem("Total supply", data && data.total_supply)}
                {this.renderItem("Available supply", data && data.total_supply)}
            </div>
        </Page>;
    }

    public componentDidMount() {
        this.getStore().loadIfNeeded();
    }

    private renderItem(title: string, value?: string | number) {
        return <div className={style.item}>
            <div className={style.title}>
                {title}
            </div>
            <div className={style.value}>
                {value}
            </div>
        </div>;
    }

    private handleRefresh = () => {
        this.getStore().loadData();
    }

    private getStore() {
        const {currencyDetailStoreFactory, id} = this.props;

        return currencyDetailStoreFactory.getOrCreateStore(Number(id));
    }
}
