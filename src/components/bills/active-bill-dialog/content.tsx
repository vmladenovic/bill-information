import {Tabs, Tab, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {TabPanel} from '@/components/tabs/tab-panel';
import {useState} from 'react';
import {useActiveBill} from '@/state/bills/selectors';

const BillTitle = styled(Typography)({
    paddingTop: '24px',
    paddingBottom: '24px',
});

// Tabs for switching between English and Gaeilge bill titles, used locally so I keep it here
enum TitleTabs {
    En,
    Ga,
}

export function Content() {
    const activeBill = useActiveBill(); // Get the currently selected bill from the Redux store
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
                <BillTitle gutterBottom>
                    {activeBill?.titleEn || 'No English title available'}
                </BillTitle>
            </TabPanel>
            <TabPanel isVisible={tab === TitleTabs.Ga}>
                <BillTitle gutterBottom>
                    {activeBill?.titleGa || 'No Gaeilge title available'}
                </BillTitle>
            </TabPanel>
        </>
    );
}
