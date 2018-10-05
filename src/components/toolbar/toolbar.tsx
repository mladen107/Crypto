import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MDToolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";

export class Toolbar  extends React.Component {
    public render() {

        return <AppBar>
            <MDToolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon/>
                </IconButton>
                <Button>Test</Button>
            </MDToolbar>
        </AppBar>;
    }
}
