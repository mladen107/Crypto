import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from "react";
import {AppLayout} from "./components/app-layout";
import {CurrencyList} from "./modules/currency-list/currency-list";

export class App extends React.Component {
    public render() {
        return <CssBaseline>
            <AppLayout>
                <CurrencyList/>
            </AppLayout>
        </CssBaseline>;
    }
}
