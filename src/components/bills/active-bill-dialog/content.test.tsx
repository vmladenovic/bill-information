import {render, screen, fireEvent} from '@testing-library/react';
import {Content} from './content';
import {useActiveBill} from '@/state/bills/selectors';

// Mock the useActiveBill hook
jest.mock('@/state/bills/selectors', () => ({
    useActiveBill: jest.fn(),
}));

describe('Content', () => {
    it('renders English tab content by default', () => {
        (useActiveBill as jest.Mock).mockReturnValue({
            titleEn: 'English Title',
            titleGa: 'Gaeilge Title',
        });

        render(<Content />);

        expect(screen.getByText('English Title')).toBeInTheDocument();
        expect(screen.queryByText('Gaeilge Title')).not.toBeInTheDocument();
    });

    it('renders Gaeilge tab content when Gaeilge tab is clicked', () => {
        (useActiveBill as jest.Mock).mockReturnValue({
            titleEn: 'English Title',
            titleGa: 'Gaeilge Title',
        });

        render(<Content />);

        const gaeilgeTab = screen.getByRole('tab', {name: 'Gaeilge'});
        fireEvent.click(gaeilgeTab);

        expect(screen.getByText('Gaeilge Title')).toBeInTheDocument();
        expect(screen.queryByText('English Title')).not.toBeInTheDocument();
    });

    it('shows fallback text when no English title is available', () => {
        (useActiveBill as jest.Mock).mockReturnValue({
            titleEn: null,
            titleGa: 'Gaeilge Title',
        });

        render(<Content />);

        expect(
            screen.getByText('No English title available'),
        ).toBeInTheDocument();
    });

    it('shows fallback text when no Gaeilge title is available', () => {
        (useActiveBill as jest.Mock).mockReturnValue({
            titleEn: 'English Title',
            titleGa: null,
        });

        render(<Content />);

        const gaeilgeTab = screen.getByRole('tab', {name: 'Gaeilge'});
        fireEvent.click(gaeilgeTab);

        expect(
            screen.getByText('No Gaeilge title available'),
        ).toBeInTheDocument();
    });
});
