import {AppToolbar} from "components/app-toolbar";
import * as React from "react";
import {content, root} from "./app-layout.scss";

export class AppLayout extends React.Component {
    public render() {
        return <div className={root}>
            <AppToolbar/>
            <div className={content}>
            {this.props.children}
            </div>
        </div>;
    }
}
