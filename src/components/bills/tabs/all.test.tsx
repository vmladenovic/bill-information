import {render, screen} from '@testing-library/react';
import {All} from './all';
import {useSetActiveBill} from '@/state/bills/dispatchers';
import {useBillsDataGridColumns} from '@/hooks/bills/useBillsDataGridColumns';
import {useDataGridPagination} from '@/hooks/use-data-grid-pagination';
import {useGetBillGridRowsQuery} from '@/queries/bill-queries';
import {DEFAULT_DATA_GRID_PAGE_SIZE_OPTIONS} from '@/constants/pagination';
import {DEFAULT_INITIAL_STATE} from '@/constants/bills';
import {DataGrid} from '@mui/x-data-grid';

// Mock dependencies
jest.mock('@/state/bills/dispatchers', () => ({
    useSetActiveBill: jest.fn(),
}));
jest.mock('@/hooks/bills/useBillsDataGridColumns', () => ({
    useBillsDataGridColumns: jest.fn(),
}));
jest.mock('@/hooks/use-data-grid-pagination', () => ({
    useDataGridPagination: jest.fn(),
}));
jest.mock('@/queries/bill-queries', () => ({
    useGetBillGridRowsQuery: jest.fn(),
}));
jest.mock('@mui/x-data-grid', () => ({
    DataGrid: jest.fn(() => <div data-testid="data-grid" />),
}));

describe('All Component', () => {
    const mockSetActiveBill = jest.fn();
    const mockUseBillsDataGridColumns = jest.fn(() => []);
    const mockUseDataGridPagination = jest.fn(() => ({
        paginationModel: {page: 0, pageSize: 10},
        filterModel: {},
        setRowCount: jest.fn(),
        rowCount: 0,
        setPaginationModel: jest.fn(),
    }));
    const mockUseGetBillGridRowsQuery = jest.fn(() => ({
        data: {rows: [], rowCount: 0},
        isFetching: false,
    }));

    beforeEach(() => {
        jest.clearAllMocks();
        (useSetActiveBill as jest.Mock).mockReturnValue(mockSetActiveBill);
        (useBillsDataGridColumns as jest.Mock).mockReturnValue(
            mockUseBillsDataGridColumns(),
        );
        (useDataGridPagination as jest.Mock).mockReturnValue(
            mockUseDataGridPagination(),
        );
        (useGetBillGridRowsQuery as jest.Mock).mockReturnValue(
            mockUseGetBillGridRowsQuery(),
        );
    });

    it('renders the DataGrid component', () => {
        render(<All />);
        expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    });

    it('calls setActiveBill when a row is clicked', () => {
        (DataGrid as jest.Mock).mockImplementation(({onRowClick}) => {
            onRowClick({row: {id: 1}});
            return <div data-testid="data-grid" />;
        });

        render(<All />);
        expect(mockSetActiveBill).toHaveBeenCalledWith({id: 1});
    });

    it('passes the correct props to DataGrid', () => {
        render(<All />);
        expect(DataGrid).toHaveBeenCalledWith(
            expect.objectContaining({
                disableColumnSelector: true,
                columns: [],
                rows: [],
                rowCount: 0,
                pagination: true,
                loading: false,
                paginationMode: 'server',
                pageSizeOptions: DEFAULT_DATA_GRID_PAGE_SIZE_OPTIONS,
                initialState: DEFAULT_INITIAL_STATE,
            }),
            {},
        );
    });

    it('updates rowCount when gridData changes', () => {
        const mockSetRowCount = jest.fn();
        (useDataGridPagination as jest.Mock).mockReturnValue({
            ...mockUseDataGridPagination(),
            setRowCount: mockSetRowCount,
        });
        (useGetBillGridRowsQuery as jest.Mock).mockReturnValue({
            data: {rows: [], rowCount: 5},
            isFetching: false,
        });

        render(<All />);
        expect(mockSetRowCount).toHaveBeenCalledWith(5);
    });
});
