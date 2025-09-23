import {useCallback, useMemo} from 'react';
import type {MouseEvent} from 'react';
import type {GridColDef, GridCellParams} from '@mui/x-data-grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {IconButton} from '@mui/material';
import {DEFAULT_GRID_COLUMNS, DEFAULT_COLUMN_OPTIONS} from '@/constants/bills';
import {useFavouriteIds} from '@/state/bills/selectors';
import {useToggleFavourite} from '@/state/bills/dispatchers';
import type {Bill} from '@/state/bills/types';

// A custom hook to define the columns for the bills data grid
export function useBillsDataGridColumns() {
    const favouriteIds = useFavouriteIds();
    const toggleFavourite = useToggleFavourite();

    const handleToggleFavourite = useCallback(
        (
            e: MouseEvent<HTMLButtonElement>,
            bill: Bill,
            isFavourite: boolean,
        ) => {
            // Prevent the row click event from being triggered
            e.preventDefault();
            e.stopPropagation();
            // Simulate an API call
            console.info(
                `API call was dispatched to ${isFavourite ? 'un-' : ''}favourite a bill`,
                {bill: bill},
            );
            toggleFavourite(bill);
        },
        [toggleFavourite],
    );

    // Memoize the columns to avoid unnecessary re-renders
    // Append a custom column for marking favouritess
    const gridColumns: GridColDef[] = useMemo(
        () => [
            ...DEFAULT_GRID_COLUMNS,
            {
                ...DEFAULT_COLUMN_OPTIONS,
                field: 'favourite',
                headerName: 'Favorite',
                align: 'center',
                renderCell: (params: GridCellParams) => {
                    // Check if the current row is in the list of favourite IDs (from the Redux store)
                    const isFavourite: boolean = favouriteIds.includes(
                        params.row.id,
                    );

                    return (
                        <IconButton
                            aria-label="favourite-button"
                            onClick={(e) =>
                                handleToggleFavourite(
                                    e,
                                    params.row,
                                    isFavourite,
                                )
                            }
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
        [favouriteIds, handleToggleFavourite],
    );

    return gridColumns;
}
