import {ICurrency} from "../currencies";

export interface ICurrenciesStore {
    isLoading: boolean;
    data: Map<string, ICurrency>;

    loadData(): void;
}
