import {useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {DEFAULT_DATA_GRID_PAGE_SIZE_OPTIONS} from '@/constants/pagination';
import {useDataGridPagination} from '@/hooks/use-data-grid-pagination';
import {useGetBillGridRowsQuery} from '@/queries/bill-queries';
import {useSetActiveBill} from '@/state/bills/dispatchers';
import {DEFAULT_INITIAL_STATE} from '@/constants/bills';
import {useBillsDataGridColumns} from '@/hooks/bills/useBillsDataGridColumns';

export function All() {
    const setActiveBill = useSetActiveBill();
    const gridColumns = useBillsDataGridColumns();

    const {
        paginationModel,
        filterModel,
        setRowCount,
        rowCount,
        onHandlePaginationModelChange,
    } = useDataGridPagination();

    const {data: gridData, isFetching: isFetchingGridData} =
        useGetBillGridRowsQuery({
            paginationModel,
            filterModel,
        });

    useEffect(() => {
        if (!gridData?.rowCount) return;

        // unfortunatelly the pagination is not working properly without this useEffect
        // useMemo with direct value gridData.rowCount couldn't fix it
        setRowCount(gridData.rowCount);
    }, [gridData?.rowCount, setRowCount]);

    return (
        <DataGrid
            disableColumnSelector
            columns={gridColumns}
            rows={gridData?.rows}
            rowCount={rowCount}
            pagination
            loading={isFetchingGridData}
            paginationMode="server"
            onPaginationModelChange={onHandlePaginationModelChange}
            onRowClick={(params) => setActiveBill(params.row)}
            pageSizeOptions={DEFAULT_DATA_GRID_PAGE_SIZE_OPTIONS}
            initialState={DEFAULT_INITIAL_STATE}
        />
    );
}
