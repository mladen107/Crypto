import {Toolbar} from "components/toolbar";
import * as React from "react";
import {root} from "./app-layout.scss";

export class AppLayout extends React.Component {
    public render() {
        return <div className={root}>
            <Toolbar/>
            {this.props.children}
        </div>;
    }
}
