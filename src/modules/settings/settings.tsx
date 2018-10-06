import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {Page} from "components/page";
import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrenciesStore} from "interfaces/stores/currencies-store";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {ISettingsStore} from "../../interfaces/stores/settings-store";
import * as style from "./settings.scss";

const availableFiatCurrencies = Object.keys(FiatCurrencyEnum);

@inject((allStores: any) => ({
    settingsStore: allStores.settingsStore as ICurrenciesStore,
}))
@observer
export class Settings extends React.Component<{ settingsStore?: ISettingsStore }> {

    public render() {
        const {settingsStore} = this.props;

        return <Page title={"Settings"} hasRefresh={false} hasBackButton>
            <form autoComplete="off" className={style.form}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="fiat-currency">Fiat Currency</InputLabel>
                    <Select
                        value={settingsStore.fiatCurrency}
                        onChange={this.handleChange}
                        inputProps={{
                            id: "fiat-currency",
                            name: "fiatCurrency",
                        }}
                    >
                        {availableFiatCurrencies.map((currency) => (
                            <MenuItem key={currency} value={currency}>{currency}</MenuItem>))}
                    </Select>
                </FormControl>

                <div className={style.formFooter}>
                    * Settings are saved in local storage
                </div>

            </form>
        </Page>;
    }

    private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const settingsStore = this.props.settingsStore;
        const currency = event.target.value as FiatCurrencyEnum;

        settingsStore.setFiatCurrency(currency);
    }
}
