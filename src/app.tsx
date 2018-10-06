import CssBaseline from "@material-ui/core/CssBaseline";
import {AppLayout} from "components/app-layout";
import {CurrencyList} from "modules/currency-list";
import * as React from "react";
import {Route, RouteComponentProps} from "react-router";

export class App extends React.Component {
    public render() {
        return <CssBaseline>
            <AppLayout>
                <Route exact path="/" component={CurrencyList}/>
                <Route path="/:currencyId"
                       component={
                           (props: RouteComponentProps<{ currencyId: string }>) =>
                               (<div>Work in progress ... {props.match.params.currencyId}</div>)}/>
            </AppLayout>
        </CssBaseline>;
    }
}
