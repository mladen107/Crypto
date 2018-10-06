import Button from "@material-ui/core/Button";
import {inject} from "mobx-react";
import {RouterStore} from "mobx-react-router";
import * as React from "react";
import * as style from "./page-back-button.scss";

@inject((allStores: any) => ({
    routerStore: allStores.routerStore as RouterStore,
}))
export class PageBackButton extends React.Component<{ routerStore?: RouterStore }> {
    public render() {
        return <Button className={style.root} onClick={this.handleClick}>Go Back</Button>;
    }

    private handleClick = () => {
        const {routerStore} = this.props;
        routerStore.goBack();
    }
}
