import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MDTableCell, {TableCellProps} from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Page} from "components/page";
import {ICurrenciesStore} from "interfaces/stores/currencies-store";
import {inject, observer} from "mobx-react";
import {RouterStore} from "mobx-react-router";
import * as React from "react";
import {tableRow} from "./currency-list.scss";

interface ICurrencyListProps {
    currenciesStore?: ICurrenciesStore;
    routerStore?: RouterStore;
}

const TableCell = (props: TableCellProps) => (<MDTableCell padding="dense" {...props}/>);

@inject((allStores: any) => ({
    currenciesStore: allStores.currenciesStore as ICurrenciesStore,
    routerStore: allStores.routerStore as RouterStore,
}))
@observer
export class CurrencyList extends React.Component<ICurrencyListProps> {
    public render() {
        const {data} = this.props.currenciesStore;

        return <Page title={"Currency List"} onRefreshClick={this.handleRefresh}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>rank</TableCell>
                        <TableCell>symbol</TableCell>
                        <TableCell numeric>price</TableCell>
                        <TableCell numeric>24 hour change</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from(data.values())
                        .sort((a, b) => (a.rank - b.rank))
                        .map((row) => {
                            return (
                                <TableRow className={tableRow} key={row.id} hover onClick={() => {
                                    this.handleRowClick(row.id);
                                }}>
                                    <TableCell component="th" scope="row">
                                        {row.rank}
                                    </TableCell>
                                    <TableCell >{row.symbol}</TableCell>
                                    <TableCell numeric>{row.quotes.USD.price} USD</TableCell>
                                    <TableCell numeric>{row.quotes.USD.percent_change_24h}%</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </Page>;
    }

    private handleRowClick = (currencyId: number) => {
        this.props.routerStore.push(`/${currencyId}`);
    }

    private handleRefresh = () => {
        this.props.currenciesStore.loadData();
    }
}
