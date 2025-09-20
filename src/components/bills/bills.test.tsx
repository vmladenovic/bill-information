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

    it.skip('renders a list of bills', () => {
        const mockBills = [
            {id: 1, name: 'Electricity', amount: 100},
            {id: 2, name: 'Water', amount: 50},
        ];
        render(<Bills bills={mockBills} />);
        const billItems = screen.getAllByTestId('bill-item');
        expect(billItems).toHaveLength(mockBills.length);
    });

    it.skip('displays a message when no bills are available', () => {
        render(<Bills bills={[]} />);
        const noBillsMessage = screen.getByText(/No bills available/i);
        expect(noBillsMessage).toBeInTheDocument();
    });
});
