import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Refresh from "@material-ui/icons/Refresh";
import * as React from "react";
import {title as titleClass} from "./page-toolbar.scss";

export interface IPageToolbarProps {
    title: string;
    hasRefresh?: boolean;
    onRefreshClick?: () => void;
}

export class PageToolbar extends React.Component<IPageToolbarProps> {
    public static defaultProps = {
        hasRefresh: true,
    };

    public render() {
        const {hasRefresh, onRefreshClick, title} = this.props;

        return <Toolbar>
            <Typography variant="title" className={titleClass}>
                {title}
            </Typography>
            {
                hasRefresh && <Tooltip title="Refresh">
                    <IconButton aria-label="Refresh" onClick={onRefreshClick}>
                        <Refresh/>
                    </IconButton>
                </Tooltip>
            }
        </Toolbar>;
    }
}
