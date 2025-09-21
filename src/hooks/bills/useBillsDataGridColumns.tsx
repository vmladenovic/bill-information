import {DEFAULT_GRID_COLUMNS, DEFAULT_COLUMN_OPTIONS} from '@/constants/bills';
import {useFavouriteIds} from '@/state/bills/selectors';
import type {GridColDef, GridCellParams} from '@mui/x-data-grid';
import {useMemo} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {IconButton} from '@mui/material';
import {useToggleFavourite} from '@/state/bills/dispatchers';

export function useBillsDataGridColumns() {
    const favouriteIds = useFavouriteIds();
    const toggleFavourite = useToggleFavourite();

    const gridColumns: GridColDef[] = useMemo(
        () => [
            ...DEFAULT_GRID_COLUMNS,
            {
                ...DEFAULT_COLUMN_OPTIONS,
                field: 'favourite',
                headerName: 'Favorite',
                align: 'center',
                renderCell: (params: GridCellParams) => {
                    const isFavourite: boolean = favouriteIds.includes(
                        params.row.id,
                    );

                    return (
                        <IconButton
                            aria-label="favourite-button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.info(
                                    `API call was dispatched to ${isFavourite ? 'un-' : ''}favourite a bill`,
                                    {bill: params.row},
                                );
                                toggleFavourite(params.row);
                            }}
                        >
                            {isFavourite ? (
                                <FavoriteIcon color="secondary" />
                            ) : (
                                <FavoriteOutlinedIcon />
                            )}
                        </IconButton>
                    );
                },
            },
        ],
        [favouriteIds, toggleFavourite],
    );

    return gridColumns;
}
