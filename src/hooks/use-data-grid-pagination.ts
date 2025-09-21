import {DEFAULT_DATA_GRID_PAGE_SIZE} from '@/constants/pagination';
import type {GridPaginationModel, GridFilterModel} from '@mui/x-data-grid';
import {useState} from 'react';

// since this can be used with every DataGrid instance I extracteds it to a separate hook -> less DRY
export function useDataGridPagination() {
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
        DEFAULT_DATA_GRID_PAGE_SIZE,
    );
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
    });

    return {
        rowCount,
        setRowCount,
        paginationModel,
        setPaginationModel,
        filterModel,
        setFilterModel,
    };
}
