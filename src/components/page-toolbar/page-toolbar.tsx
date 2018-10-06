import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/Refresh";
import * as React from "react";
import {title as titleClass} from "./page-toolbar.scss";

export interface IPageToolbarProps {
    title: string;
    onRefreshClick?: () => void;
}

export class PageToolbar extends React.Component<IPageToolbarProps> {
    public render() {
        const {onRefreshClick, title} = this.props;

        return <Toolbar>
            <Typography variant="title" className={titleClass}>
                {title}
            </Typography>
            <Tooltip title="Refresh">
                <IconButton aria-label="Refresh" onClick={onRefreshClick}>
                    <FilterListIcon/>
                </IconButton>
            </Tooltip>
        </Toolbar>;
    }
}
