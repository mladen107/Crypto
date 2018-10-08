import {FiatCurrencyEnum} from "enums/fiat-currency-enum";
import {ICurrencyTickerCollectionResponse} from "interfaces/currencies";
import {ICurrenciesStoreApi} from "interfaces/stores/currencies-store";
import {ISettingsStore} from "interfaces/stores/settings-store";
import {isObservable, isObservableMap, isObservableProp, when} from "mobx";
import * as response from "../test/data/currency-list-response.json";
import {CurrenciesStore} from "./currencies-store";

// tslint:disable: max-classes-per-file
describe("Currencies Store", () => {
    class MockSettingsStore implements ISettingsStore {
        public fiatCurrency = FiatCurrencyEnum.USD;

        public setFiatCurrency(fiatCurrency: FiatCurrencyEnum) {
            this.fiatCurrency = fiatCurrency;
        }
    }

    class MockApi implements ICurrenciesStoreApi {
        private unresolvedReq: any = [];

        public getTopCurrencies() {
            return new Promise<ICurrencyTickerCollectionResponse>((resolve) => {
                this.unresolvedReq.push(resolve);
            });
        }

        public resolveOne() {
            this.unresolvedReq.shift()(response);
        }
    }

    const mockSettingsStore = new MockSettingsStore();

    beforeEach(() => {
        mockSettingsStore.setFiatCurrency(FiatCurrencyEnum.USD);
    });

    it("is initialized correctly", () => {
        const store = new CurrenciesStore(new MockApi(), mockSettingsStore);

        expect(store.data.size).toBe(0);
        expect(isObservableMap(store.data)).toBeTruthy();
        expect(store.isLoading).toBe(false);
        expect(isObservableProp(store, "isLoading")).toBeTruthy();
        expect(store.fiatCurrency).toBe(undefined);
        expect(isObservableProp(store, "fiatCurrency")).toBeTruthy();
    });

    describe("when loadData is called", () => {
        it("loads data correctly", (done) => {
            const mockApi = new MockApi();
            const store = new CurrenciesStore(mockApi, mockSettingsStore);

            expect(store.data.size).toBe(0);
            expect(store.isLoading).toBe(false);

            store.loadData();
            expect(store.isLoading).toBe(true);

            mockApi.resolveOne();

            when(() => !store.isLoading, () => {
                expect(store.data.size).toBe(2);
                expect(store.fiatCurrency).toEqual(FiatCurrencyEnum.USD);
                done();
            });
        });

        it("takes correct settings", (done) => {
            const mockApi = new MockApi();
            const store = new CurrenciesStore(mockApi, mockSettingsStore);
            const mockGetTopCurrencies = jest.fn(mockApi.getTopCurrencies.bind(mockApi));
            mockApi.getTopCurrencies = mockGetTopCurrencies;
            mockSettingsStore.setFiatCurrency(FiatCurrencyEnum.EUR);
            store.loadData();
            mockApi.resolveOne();

            when(() => !store.isLoading, () => {
                expect(store.fiatCurrency).toBe(FiatCurrencyEnum.EUR);
                mockSettingsStore.setFiatCurrency(FiatCurrencyEnum.CNY);
                store.loadData();
                mockApi.resolveOne();
                expect(mockGetTopCurrencies.mock.calls).toEqual([[FiatCurrencyEnum.EUR], [FiatCurrencyEnum.CNY]]);
                done();
            });
        });

        it("does not allow new requests while loading", () => {
            const mockApi = new MockApi();
            const store = new CurrenciesStore(mockApi, mockSettingsStore);
            const mockGetTopCurrencies = jest.fn(mockApi.getTopCurrencies.bind(mockApi));
            mockApi.getTopCurrencies = mockGetTopCurrencies;
            store.isLoading = true;
            store.loadData();
            expect(mockGetTopCurrencies.mock.calls.length).toEqual(0);
        });
    });

    describe("when loadIfNeeded is called", () => {
        it("loads data correctly in initial state", (done) => {
            const mockApi = new MockApi();
            const store = new CurrenciesStore(mockApi, mockSettingsStore);

            store.loadIfNeeded();
            expect(store.isLoading).toBe(true);

            mockApi.resolveOne();

            when(() => !store.isLoading, () => {
                expect(store.data.size).toBe(2);
                expect(store.fiatCurrency).toEqual(FiatCurrencyEnum.USD);
                done();
            });
        });

        it("and data with correct currency is already loaded, doesn't make additional requests", (done) => {
            const mockApi = new MockApi();
            const store = new CurrenciesStore(mockApi, mockSettingsStore);
            const mockGetTopCurrencies = jest.fn(mockApi.getTopCurrencies.bind(mockApi));

            mockApi.getTopCurrencies = mockGetTopCurrencies;
            store.loadData();
            expect(store.isLoading).toBe(true);

            mockApi.resolveOne();

            when(() => !store.isLoading, () => {
                store.loadIfNeeded();
                expect(mockGetTopCurrencies.mock.calls.length).toEqual(1);
                done();
            });
        });

        it("and data with correct currency is already loading, doesn't make additional requests", (done) => {
            const mockApi = new MockApi();
            const store = new CurrenciesStore(mockApi, mockSettingsStore);
            const mockGetTopCurrencies = jest.fn(mockApi.getTopCurrencies.bind(mockApi));

            mockApi.getTopCurrencies = mockGetTopCurrencies;
            store.loadData();
            store.loadIfNeeded();
            expect(store.isLoading).toBe(true);

            mockApi.resolveOne();

            when(() => !store.isLoading, () => {
                expect(mockGetTopCurrencies.mock.calls.length).toEqual(1);
                done();
            });
        });

        it("and data with other currency is already loaded, makes additional request", (done) => {
            const mockApi = new MockApi();
            const store = new CurrenciesStore(mockApi, mockSettingsStore);
            const mockGetTopCurrencies = jest.fn(mockApi.getTopCurrencies.bind(mockApi));

            mockApi.getTopCurrencies = mockGetTopCurrencies;
            store.loadData();
            expect(store.isLoading).toBe(true);

            mockApi.resolveOne();

            when(() => !store.isLoading, () => {
                mockSettingsStore.setFiatCurrency(FiatCurrencyEnum.EUR);
                store.loadIfNeeded();
                expect(mockGetTopCurrencies.mock.calls.length).toEqual(1);
                done();
            });
        });

        it("and data with other currency is already loading, makes additional request", (done) => {
            const mockApi = new MockApi();
            const store = new CurrenciesStore(mockApi, mockSettingsStore);
            const mockGetTopCurrencies = jest.fn(mockApi.getTopCurrencies.bind(mockApi));

            mockApi.getTopCurrencies = mockGetTopCurrencies;
            store.loadData();
            mockSettingsStore.setFiatCurrency(FiatCurrencyEnum.EUR);
            store.loadIfNeeded();
            expect(store.isLoading).toBe(true);

            mockApi.resolveOne();
            setImmediate(() => mockApi.resolveOne()); // waits for second load to fire before resolving it

            when(() => !store.isLoading, () => {
                expect(mockGetTopCurrencies.mock.calls)
                    .toEqual([[FiatCurrencyEnum.USD], [FiatCurrencyEnum.EUR]]);
                done();
            });
        });
    });
});
