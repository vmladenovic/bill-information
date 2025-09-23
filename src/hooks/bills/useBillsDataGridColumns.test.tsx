/* eslint-disable @typescript-eslint/no-explicit-any */
import {useBillsDataGridColumns} from './useBillsDataGridColumns';
import {useFavouriteIds} from '@/state/bills/selectors';
import {useToggleFavourite} from '@/state/bills/dispatchers';
import {DEFAULT_GRID_COLUMNS} from '@/constants/bills';
import {IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {renderHook} from '@testing-library/react';

// Mock dependencies
jest.mock('@/state/bills/selectors', () => ({
    useFavouriteIds: jest.fn(),
}));

jest.mock('@/state/bills/dispatchers', () => ({
    useToggleFavourite: jest.fn(),
}));

jest.mock('@/constants/bills', () => ({
    DEFAULT_GRID_COLUMNS: [{field: 'name', headerName: 'Name'}],
    DEFAULT_COLUMN_OPTIONS: {sortable: true},
}));

describe('useBillsDataGridColumns', () => {
    it('should return default grid columns with the favourite column', () => {
        (useFavouriteIds as jest.Mock).mockReturnValue([]);
        const toggleFavouriteMock = jest.fn();
        (useToggleFavourite as jest.Mock).mockReturnValue(toggleFavouriteMock);

        const {result} = renderHook(() => useBillsDataGridColumns());

        expect(result.current).toHaveLength(DEFAULT_GRID_COLUMNS.length + 1);
        const favouriteColumn = result.current.find(
            (col) => col.field === 'favourite',
        );
        expect(favouriteColumn).toBeDefined();
        expect(favouriteColumn?.headerName).toBe('Favorite');
        expect(favouriteColumn?.align).toBe('center');
    });

    it('should render FavoriteIcon when the row is a favourite', () => {
        (useFavouriteIds as jest.Mock).mockReturnValue(['1']);
        const toggleFavouriteMock = jest.fn();
        (useToggleFavourite as jest.Mock).mockReturnValue(toggleFavouriteMock);

        const {result} = renderHook(() => useBillsDataGridColumns());
        const favouriteColumn = result.current.find(
            (col) => col.field === 'favourite',
        );

        const params = {row: {id: '1'}};
        const renderCell = favouriteColumn?.renderCell as (
            params: any,
        ) => JSX.Element;
        const cell = renderCell(params);

        expect(cell).toBeDefined();
        expect(cell.type).toBe(IconButton);
        expect(cell.props.children.type).toBe(FavoriteIcon);
    });

    it('should render FavoriteOutlinedIcon when the row is not a favourite', () => {
        (useFavouriteIds as jest.Mock).mockReturnValue([]);
        const toggleFavouriteMock = jest.fn();
        (useToggleFavourite as jest.Mock).mockReturnValue(toggleFavouriteMock);

        const {result} = renderHook(() => useBillsDataGridColumns());
        const favouriteColumn = result.current.find(
            (col) => col.field === 'favourite',
        );

        const params = {row: {id: '1'}};
        const renderCell = favouriteColumn?.renderCell as (
            params: any,
        ) => JSX.Element;
        const cell = renderCell(params);

        expect(cell).toBeDefined();
        expect(cell.type).toBe(IconButton);
        expect(cell.props.children.type).toBe(FavoriteOutlinedIcon);
    });

    it('should call toggleFavourite when the IconButton is clicked', () => {
        (useFavouriteIds as jest.Mock).mockReturnValue([]);
        const toggleFavouriteMock = jest.fn();
        (useToggleFavourite as jest.Mock).mockReturnValue(toggleFavouriteMock);

        const {result} = renderHook(() => useBillsDataGridColumns());
        const favouriteColumn = result.current.find(
            (col) => col.field === 'favourite',
        );

        const params = {row: {id: '1'}};
        const renderCell = favouriteColumn?.renderCell as (
            params: any,
        ) => JSX.Element;
        const cell = renderCell(params);

        cell.props.onClick({
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
        });

        expect(toggleFavouriteMock).toHaveBeenCalledWith(params.row);
    });
});
