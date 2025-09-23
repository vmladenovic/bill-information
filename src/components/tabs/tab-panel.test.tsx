import {render} from '@testing-library/react';
import {TabPanel} from './tab-panel';

describe('TabPanel', () => {
    it('should render children when isVisible is true', () => {
        const {getByText} = render(
            <TabPanel isVisible={true}>
                <div>Visible Content</div>
            </TabPanel>,
        );

        expect(getByText('Visible Content')).toBeInTheDocument();
    });

    it('should not render children when isVisible is false', () => {
        const {queryByText} = render(
            <TabPanel isVisible={false}>
                <div>Hidden Content</div>
            </TabPanel>,
        );

        expect(queryByText('Hidden Content')).not.toBeInTheDocument();
    });
});
