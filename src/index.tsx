import {Api} from "api";
import createBrowserHistory from "history/createBrowserHistory";
import {configure} from "mobx";
import {Provider} from "mobx-react";
import {RouterStore, syncHistoryWithStore} from "mobx-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";
import {App} from "./app";
import "./index.scss";
import {CurrenciesStore} from "./stores/currencies-store";

configure({
    enforceActions: "observed",
});

const api = new Api();
const currenciesStore = new CurrenciesStore(api);
currenciesStore.loadData();

const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routerStore);

const stores = {
    currenciesStore,
    routerStore,
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
