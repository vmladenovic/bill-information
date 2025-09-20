import {AppBar, Box, Container, Tab, Tabs, Typography} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useState} from 'react';
import {TabPanel} from './tab-panel';
import {All} from './tabs/all';
import {Favourite} from './tabs/favourite';

enum BillTabs {
    All = 0,
    Favourite = 1,
}

export function Bills() {
    const [tab, setTab] = useState<BillTabs>(BillTabs.All);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Bill Assesment
            </Typography>

            <Box
                sx={{
                    bgcolor: 'background.paper',
                    width: '100%',
                    minHeight: '100%',
                }}
            >
                <AppBar position="static" sx={{backgroundColor: grey[900]}}>
                    <Tabs
                        value={tab}
                        onChange={(_, value) => setTab(value as BillTabs)}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="Bills tab select"
                    >
                        <Tab label="All Bills" id="all" value={BillTabs.All} />
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
    );
}
