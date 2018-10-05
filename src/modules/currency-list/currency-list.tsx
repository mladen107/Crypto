import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/Refresh";
import {ICurrenciesStore} from "interfaces/stores/currencies-store";
import {inject, observer} from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as React from "react";

interface ICurrencyListProps {
    currenciesStore?: ICurrenciesStore;
    routerStore?: RouterStore;
}

@inject((allStores: any) => ({
    currenciesStore: allStores.currenciesStore as ICurrenciesStore,
    routerStore: allStores.routerStore as RouterStore,
}))
@observer
export class CurrencyList extends React.Component<ICurrencyListProps> {
    public render() {
        const {data} = this.props.currenciesStore;

        return <Paper>
            <Toolbar>
                <Typography variant="title">
                    Currency List
                </Typography>
                <div></div>
                <IconButton aria-label="Filter list" onClick={this.handleRefresh}>
                    <FilterListIcon/>
                </IconButton>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell numeric>rank</TableCell>
                        <TableCell numeric>symbol</TableCell>
                        <TableCell numeric>price</TableCell>
                        <TableCell numeric>24 hour change</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from(data.values())
                        .sort((a, b) => (a.rank - b.rank))
                        .map((row) => {
                            return (
                                <TableRow key={row.id} hover onClick={() => {
                                    this.handleRowClick(row.id);
                                }}>
                                    <TableCell numeric component="th" scope="row">
                                        {row.rank}
                                    </TableCell>
                                    <TableCell>{row.symbol}</TableCell>
                                    <TableCell numeric>{row.quotes.USD.price} USD</TableCell>
                                    <TableCell numeric>{row.quotes.USD.percent_change_24h}%</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </Paper>;
    }

    private handleRowClick = (currencyId: number) => {
        this.props.routerStore.push(`/${currencyId}`);
    }

    private handleRefresh = () => {
        this.props.currenciesStore.loadData();
    }
}
