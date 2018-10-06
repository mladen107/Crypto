import Paper from "@material-ui/core/Paper";
import {IPageToolbarProps, PageToolbar} from "components/page-toolbar";
import * as React from "react";
import {PageBackButton} from "./page-back-button";

interface IPageProps extends IPageToolbarProps {
    hasBackButton?: boolean;
}

export class Page extends React.Component<IPageProps> {
    public render() {
        const {hasRefresh, children, title, onRefreshClick, hasBackButton} = this.props;
        const toolbarProps = {hasRefresh, title, onRefreshClick};

        return <React.Fragment>
            {hasBackButton && <PageBackButton/>}
            <Paper>
                <PageToolbar {...toolbarProps}/>
                {children}
            </Paper>
        </React.Fragment>;
    }
}
