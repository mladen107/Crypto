import {Api} from "api";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./app";
import "./index.scss";

import {configure} from "mobx";
import {Provider} from "mobx-react";
import {CurrenciesStore} from "./stores/currencies-store";

configure({
    enforceActions: "observed",
});

const api = new Api();
const currenciesStore = new CurrenciesStore(api);
currenciesStore.loadData();

const rootNode = document.createElement("div");
document.body.appendChild(rootNode);

ReactDOM.render(
    <Provider currenciesStore={currenciesStore}>
        <App/>
    </Provider>,
    rootNode,
);
