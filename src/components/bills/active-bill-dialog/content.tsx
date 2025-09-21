import {Tabs, Tab, Typography} from '@mui/material';
import {TabPanel} from '@/components/tabs/tab-panel';
import {useState} from 'react';
import {useActiveBill} from '@/state/bills/selectors';

enum TitleTabs {
    En,
    Ga,
}

export function Content() {
    const activeBill = useActiveBill();
    const [tab, setTab] = useState<TitleTabs>(TitleTabs.En);

    return (
        <>
            <Tabs
                value={tab}
                onChange={(_, value) => setTab(value)}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="Bill title language tab select"
            >
                <Tab label="English" id="english" value={TitleTabs.En} />
                <Tab label="Gaeilge" id="gaeilge" value={TitleTabs.Ga} />
            </Tabs>

            <TabPanel isVisible={tab === TitleTabs.En}>
                <Typography gutterBottom sx={{paddingTop: 3}}>
                    {activeBill?.titleEn || 'No English title available'}
                </Typography>
            </TabPanel>
            <TabPanel isVisible={tab === TitleTabs.Ga}>
                <Typography gutterBottom sx={{paddingTop: 3}}>
                    {activeBill?.titleGa || 'No Gaeilge title available'}
                </Typography>
            </TabPanel>
        </>
    );
}
