import {screen} from '@testing-library/react';
import {Bills} from './bills';
import {renderWithProviders} from '@/tests/utils/render-with-providers';

describe('Bills Component', () => {
    it('renders the Bills component', () => {
        const {container} = renderWithProviders(<Bills />);
        const billsElement = container.querySelector(
            '.MuiDataGrid-mainContent',
        );
        expect(billsElement).toBeInTheDocument();
    });

    it('displays the correct title', () => {
        renderWithProviders(<Bills />);
        const titleElement = screen.getByText(/Bill Assesment/i);
        expect(titleElement).toBeInTheDocument();
    });
});
