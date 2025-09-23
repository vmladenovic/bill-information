import {DEFAULT_INITIAL_STATE} from '@/constants/bills';
import {DEFAULT_DATA_GRID_PAGE_SIZE_OPTIONS} from '@/constants/pagination';
import {useBillsDataGridColumns} from '@/hooks/bills/useBillsDataGridColumns';
import {useSetActiveBill, useSetTab} from '@/state/bills/dispatchers';
import {useFavourites} from '@/state/bills/selectors';
import {Button, Paper, Stack, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {BillTabs} from '@/state/bills/types';
import {styled} from '@mui/system';

const Description = styled(Typography)(({theme}) => ({
    textAlign: 'center',
    paddindX: theme.spacing(3),
}));

export function Favourite() {
    const favourites = useFavourites();
    const setActiveBill = useSetActiveBill();
    const gridColumns = useBillsDataGridColumns();
    const setTab = useSetTab();

    if (!favourites?.length) {
        return (
            <Paper sx={{py: 6}}>
                <Stack
                    spacing={2}
                    alignItems="center"
                    mt={4}
                    mx="auto"
                    maxHeight={400}
                >
                    <FavoriteOutlinedIcon fontSize="large" color="secondary" />
                    <Description variant="h5" gutterBottom>
                        You have no favourite bills yet.
                    </Description>
                    <Description variant="body1" gutterBottom>
                        Click the heart icon next to a bill to add it to your
                        favourites.
                    </Description>
                    <Button
                        color="primary"
                        onClick={() => setTab(BillTabs.All)}
                    >
                        Return to Bills
                    </Button>
                </Stack>
            </Paper>
        );
    }

    return (
        <DataGrid
            disableColumnSelector
            columns={gridColumns}
            rows={favourites}
            pagination
            onRowClick={(params) => setActiveBill(params.row)}
            pageSizeOptions={DEFAULT_DATA_GRID_PAGE_SIZE_OPTIONS}
            initialState={DEFAULT_INITIAL_STATE}
        />
    );
}
