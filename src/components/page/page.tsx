import Paper from "@material-ui/core/Paper";
import {IPageToolbarProps, PageToolbar} from "components/page-toolbar";
import * as React from "react";

export class Page extends React.Component<IPageToolbarProps> {
    public render() {
        const {children, title, onRefreshClick} = this.props;

        return <Paper>
            <PageToolbar title={title} onRefreshClick={onRefreshClick}/>
            {children}
        </Paper>;
    }
}
