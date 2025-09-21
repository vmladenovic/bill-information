import {
    DEFAULT_DATA_GRID_PAGE_SIZE,
    DEFAULT_DATA_GRID_PAGE_SIZE_OPTIONS,
} from '@/constants/pagination';
import {useDataGridPagination} from '@/hooks/use-data-grid-pagination';
import {useGetBillGridRowsQuery} from '@/queries/bill-queries';
import {useSetActiveBill} from '@/state/bills/dispatchers';

import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect} from 'react';

const DEFAULT_COLUMN_OPTIONS = {
    sortable: false,
    filterable: false,
    resizable: true,
};

// since this is a local constant we can keep it here for the readibility purposes
const gridColumns: GridColDef[] = [
    {
        ...DEFAULT_COLUMN_OPTIONS,
        field: 'billNo',
        headerName: 'Bill Number',
        width: 130,
    },
    {
        ...DEFAULT_COLUMN_OPTIONS,
        field: 'type',
        headerName: 'Bill Type',
        width: 130,
        filterable: true,
    },
    {
        ...DEFAULT_COLUMN_OPTIONS,
        field: 'status',
        headerName: 'Bill Status',
        width: 130,
        type: 'singleSelect',
        sortable: false,
        filterable: false,
    },
    {
        ...DEFAULT_COLUMN_OPTIONS,
        field: 'sponsor',
        headerName: 'Sponsor',
        flex: 1,
        minWidth: 300,
    },
    {
        field: 'titleEn',
    },
    {
        field: 'titleGa',
    },
];

export function All() {
    const setActiveBill = useSetActiveBill();
    const {
        paginationModel,
        filterModel,
        setRowCount,
        rowCount,
        setPaginationModel,
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
            onPaginationModelChange={setPaginationModel}
            onRowClick={(params) => setActiveBill(params.row)}
            pageSizeOptions={DEFAULT_DATA_GRID_PAGE_SIZE_OPTIONS}
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        titleEn: false,
                        titleGa: false,
                    },
                },
                pagination: {
                    paginationModel: DEFAULT_DATA_GRID_PAGE_SIZE,
                },
            }}
        />
    );
}
