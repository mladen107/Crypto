import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MDToolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import SettingsIcon from "@material-ui/icons/Settings";
import * as React from "react";
import {Link, LinkProps} from "react-router-dom";
import * as style from "./app-toolbar.scss";

const SettingsLink = (props: LinkProps) => <Link to="/settings" {...props} />;

export class AppToolbar extends React.Component {
    public render() {

        return <AppBar>
            <MDToolbar>
                <div className={style.title}>
                    <Link to={"/"} className={style.titleLink}>
                        Crypto

                    </Link>
                </div>
                <Tooltip title="Settings">
                    <IconButton color="inherit" aria-label="Settings" component={SettingsLink}>
                        <SettingsIcon/>
                    </IconButton>
                </Tooltip>
            </MDToolbar>
        </AppBar>;
    }
}
