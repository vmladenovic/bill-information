import {useCallback, useState} from 'react';
import {DEFAULT_DATA_GRID_PAGE_MODEL} from '@/constants/pagination';
import type {GridPaginationModel, GridFilterModel} from '@mui/x-data-grid';

// since this can be used with every DataGrid instance I extracteds it to a separate hook -> less DRY
export function useDataGridPagination() {
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
        DEFAULT_DATA_GRID_PAGE_MODEL,
    );
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
    });

    const onHandlePaginationModelChange = useCallback(
        (model: GridPaginationModel) => {
            const newModel = {...model};

            if (model.pageSize !== paginationModel.pageSize) {
                model.page = 0; // reset to first page when page size changes
            }

            setPaginationModel(newModel);
        },
        [paginationModel.pageSize, setPaginationModel],
    );

    return {
        rowCount,
        setRowCount,
        paginationModel,
        filterModel,
        setFilterModel,
        onHandlePaginationModelChange,
    };
}
