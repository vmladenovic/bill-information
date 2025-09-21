import {render, screen, fireEvent} from '@testing-library/react';
import {Content} from './content';
import {useActiveBill} from '@/state/bills/selectors';

jest.mock('@/state/bills/selectors', () => ({
    useActiveBill: jest.fn(),
}));

describe('Content Component', () => {
    it('renders the English tab by default', () => {
        (useActiveBill as jest.Mock).mockReturnValue({
            titleEn: 'Sample English Title',
            titleGa: 'Sample Gaeilge Title',
        });

        render(<Content />);

        const englishTab = screen.getByRole('tab', {name: /English/i});
        const gaeilgeTab = screen.getByRole('tab', {name: /Gaeilge/i});
        const englishContent = screen.getByText(/Sample English Title/i);

        expect(englishTab).toBeInTheDocument();
        expect(gaeilgeTab).toBeInTheDocument();
        expect(englishContent).toBeInTheDocument();
    });

    it('switches to the Gaeilge tab and displays the correct content', () => {
        (useActiveBill as jest.Mock).mockReturnValue({
            titleEn: 'Sample English Title',
            titleGa: 'Sample Gaeilge Title',
        });

        render(<Content />);

        const gaeilgeTab = screen.getByRole('tab', {name: /Gaeilge/i});
        fireEvent.click(gaeilgeTab);

        const gaeilgeContent = screen.getByText(/Sample Gaeilge Title/i);
        expect(gaeilgeContent).toBeInTheDocument();
    });

    it('displays fallback text when no English title is available', () => {
        (useActiveBill as jest.Mock).mockReturnValue({
            titleEn: '',
            titleGa: 'Sample Gaeilge Title',
        });

        render(<Content />);

        const fallbackText = screen.getByText(/No English title available/i);
        expect(fallbackText).toBeInTheDocument();
    });

    it('displays fallback text when no Gaeilge title is available', () => {
        (useActiveBill as jest.Mock).mockReturnValue({
            titleEn: 'Sample English Title',
            titleGa: '',
        });

        render(<Content />);

        const gaeilgeTab = screen.getByRole('tab', {name: /Gaeilge/i});
        fireEvent.click(gaeilgeTab);

        const fallbackText = screen.getByText(/No Gaeilge title available/i);
        expect(fallbackText).toBeInTheDocument();
    });

    it('renders without crashing when no active bill is available', () => {
        (useActiveBill as jest.Mock).mockReturnValue(null);

        render(<Content />);

        const englishTab = screen.getByRole('tab', {name: /English/i});
        const gaeilgeTab = screen.getByRole('tab', {name: /Gaeilge/i});
        const fallbackText = screen.getByText(/No English title available/i);

        expect(englishTab).toBeInTheDocument();
        expect(gaeilgeTab).toBeInTheDocument();
        expect(fallbackText).toBeInTheDocument();
    });
});
