import {AppBar, Box, Container, Tab, Tabs, Typography} from '@mui/material';
import {useActiveBill, useBillTab} from '@/state/bills/selectors';
import {useSetTab} from '@/state/bills/dispatchers';
import dynamic from 'next/dynamic';
import {BillTabs} from '@/state/bills/types';

import {All} from './tabs/all';

// Load components lazily to reduce the global bundle size
const Favourite = dynamic(
    () => import('./tabs/favourite').then(({Favourite}) => Favourite),
    {ssr: false},
);
const ActiveBillDialog = dynamic(
    () =>
        import('./active-bill-dialog/active-bill-dialog').then(
            ({ActiveBillDialog}) => ActiveBillDialog,
        ),
    {ssr: false},
);

export function Bills() {
    const activeBill = useActiveBill();
    const tab = useBillTab();
    const setTab = useSetTab();

    return (
        <>
            <Container maxWidth="md">
                <Typography variant="h4" component="h1" gutterBottom>
                    Bill Assesment
                </Typography>

                <Box
                    sx={{
                        width: '100%',
                        minHeight: '100%',
                    }}
                >
                    <AppBar position="static">
                        <Tabs
                            value={tab}
                            onChange={(_, value) => setTab(value as BillTabs)}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="Bills tab select"
                        >
                            <Tab
                                label="All Bills"
                                id="all"
                                value={BillTabs.All}
                            />
                            <Tab
                                label="Favourite Bills"
                                id="favourite"
                                value={BillTabs.Favourite}
                            />
                        </Tabs>

                        {tab === BillTabs.All && <All />}
                        {tab === BillTabs.Favourite && <Favourite />}
                    </AppBar>
                </Box>
            </Container>

            {!!activeBill && <ActiveBillDialog />}
        </>
    );
}
