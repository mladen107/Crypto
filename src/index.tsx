import {Api} from "api";
import createBrowserHistory from "history/createBrowserHistory";
import {configure} from "mobx";
import {Provider} from "mobx-react";
import {RouterStore, syncHistoryWithStore} from "mobx-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router} from "react-router";
import {CurrenciesStore} from "stores/currencies-store";
import {CurrencyDetailStoreFactory} from "stores/currency-detail-store-factory";
import {SettingsStore} from "stores/settings-store";
import {App} from "./app";
import "./index.scss";

configure({
    enforceActions: "observed",
});

const api = new Api();

const settingsStore = new SettingsStore();
const currenciesStore = new CurrenciesStore(api, settingsStore);
const currencyDetailStoreFactory = new CurrencyDetailStoreFactory(api, settingsStore);

const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routerStore);

const stores = {
    currenciesStore,
    currencyDetailStoreFactory,
    routerStore,
    settingsStore,
};

const rootNode = document.createElement("div");
document.body.appendChild(rootNode);

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    rootNode,
);
