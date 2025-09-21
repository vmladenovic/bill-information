import {AppBar, Box, Container, Tab, Tabs, Typography} from '@mui/material';
import {TabPanel} from '../tabs/tab-panel';
import {All} from './tabs/all';
import {Favourite} from './tabs/favourite';
import {ActiveBillDialog} from './active-bill-dialog/active-bill-dialog';
import {useActiveBill, useBillTab} from '@/state/bills/selectors';
import {useSetTab} from '@/state/bills/dispatchers';

enum BillTabs {
    All = 0,
    Favourite = 1,
}

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

                        <TabPanel isVisible={tab === BillTabs.All}>
                            <All />
                        </TabPanel>
                        <TabPanel isVisible={tab === BillTabs.Favourite}>
                            <Favourite />
                        </TabPanel>
                    </AppBar>
                </Box>
            </Container>

            {!!activeBill && <ActiveBillDialog />}
        </>
    );
}
