import type {PropsWithChildren} from 'react';
import {render} from '@testing-library/react';
import type {RenderOptions} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import type {Draft} from 'immer';

import rootReducer from '@/state/root-reducer';
import type {RootState, Store} from '@/state/store';
import {BillTabs} from '@/state/bills/types';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Draft<RootState>;
    store?: Store;
}

const mockQueryClient = new QueryClient();

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {
            bills: {activeBill: undefined, favourites: [], tab: BillTabs.All},
        },
        store = configureStore({reducer: rootReducer, preloadedState}),
        ...renderOptions
    }: ExtendedRenderOptions = {},
) {
    function Wrapper({children}: PropsWithChildren): JSX.Element {
        return (
            <QueryClientProvider client={mockQueryClient}>
                <Provider store={store}>{children}</Provider>
            </QueryClientProvider>
        );
    }

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
