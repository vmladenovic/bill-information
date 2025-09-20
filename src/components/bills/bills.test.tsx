import {render, screen} from '@testing-library/react';
import {Bills} from './bills';

describe('Bills Component', () => {
    it('renders the Bills component', () => {
        const {container} = render(<Bills />);
        const billsElement = container.querySelector(
            '.MuiDataGrid-mainContent',
        );
        expect(billsElement).toBeInTheDocument();
    });

    it('displays the correct title', () => {
        render(<Bills />);
        const titleElement = screen.getByText(/Bill Assesment/i);
        expect(titleElement).toBeInTheDocument();
    });
});
