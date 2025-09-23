import {render, screen, fireEvent} from '@testing-library/react';
import {Favourite} from './favourite';
import {useSetActiveBill, useSetTab} from '@/state/bills/dispatchers';
import {useFavourites} from '@/state/bills/selectors';
import {useBillsDataGridColumns} from '@/hooks/bills/useBillsDataGridColumns';
import {BillTabs} from '@/state/bills/types';

// Mock dependencies
jest.mock('@/state/bills/dispatchers', () => ({
    useSetActiveBill: jest.fn(),
    useSetTab: jest.fn(),
}));

jest.mock('@/state/bills/selectors', () => ({
    useFavourites: jest.fn(),
}));

jest.mock('@/hooks/bills/useBillsDataGridColumns', () => ({
    useBillsDataGridColumns: jest.fn(),
}));

jest.mock('@mui/x-data-grid', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DataGrid: (props: any) => (
        <div data-testid="data-grid" {...props}>
            DataGrid Mock
        </div>
    ),
}));

describe('Favourite Component', () => {
    const mockSetActiveBill = jest.fn();
    const mockSetTab = jest.fn();
    const mockGridColumns = [{field: 'id', headerName: 'ID'}];

    beforeEach(() => {
        jest.clearAllMocks();
        (useSetActiveBill as jest.Mock).mockReturnValue(mockSetActiveBill);
        (useSetTab as jest.Mock).mockReturnValue(mockSetTab);
        (useBillsDataGridColumns as jest.Mock).mockReturnValue(mockGridColumns);
    });

    it('renders empty state when there are no favourites', () => {
        (useFavourites as jest.Mock).mockReturnValue([]);

        render(<Favourite />);

        expect(
            screen.getByText('You have no favourite bills yet.'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Click the heart icon next to a bill to add it to your favourites.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', {name: 'Return to Bills'}),
        ).toBeInTheDocument();
    });

    it('calls setTab with BillTabs.All when "Return to Bills" button is clicked', () => {
        (useFavourites as jest.Mock).mockReturnValue([]);

        render(<Favourite />);

        const button = screen.getByRole('button', {name: 'Return to Bills'});
        fireEvent.click(button);

        expect(mockSetTab).toHaveBeenCalledWith(BillTabs.All);
    });

    it('renders DataGrid when there are favourites', () => {
        const mockFavourites = [{id: 1, name: 'Bill 1'}];
        (useFavourites as jest.Mock).mockReturnValue(mockFavourites);

        render(<Favourite />);

        expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    });
});
