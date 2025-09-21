import type {GridColDef} from '@mui/x-data-grid';
import {DEFAULT_DATA_GRID_PAGE_SIZE} from './pagination';

export const DEFAULT_COLUMN_OPTIONS = {
    sortable: false,
    filterable: false,
    resizable: true,
};

export const DEFAULT_GRID_COLUMNS: GridColDef[] = [
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

export const DEFAULT_INITIAL_STATE = {
    columns: {
        columnVisibilityModel: {
            titleEn: false,
            titleGa: false,
        },
    },
    pagination: {
        paginationModel: DEFAULT_DATA_GRID_PAGE_SIZE,
    },
};
