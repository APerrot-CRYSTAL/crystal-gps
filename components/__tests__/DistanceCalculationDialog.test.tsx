import { render, screen, fireEvent, waitFor, within } from '../../testing/test-utils';
import DistanceCalculationDialog from '../DistanceCalculationDialog';
import { GpsPosition } from '@/domain/gps/position';
import { calculateDistanceBetweenTwoGpsPositions } from '@/domain/gps/position';

jest.mock('@/domain/gps/position', () => ({
  ...jest.requireActual('@/domain/gps/position'),
  calculateDistanceBetweenTwoGpsPositions: jest.fn(() => 654.32),
}));

const mockCalculateDistance = calculateDistanceBetweenTwoGpsPositions as jest.MockedFunction<typeof calculateDistanceBetweenTwoGpsPositions>;

const mockOnClose = jest.fn();

describe('DistanceCalculationDialog', () => {
  const mockPositions: GpsPosition[] = [
    { id: 1, name: 'Paris', longitude: 2.3522, latitude: 48.8566 },
    { id: 2, name: 'Lyon', longitude: 4.8357, latitude: 45.7640 },
    { id: 3, name: 'Marseille', longitude: 5.3698, latitude: 43.2965 },
  ];

  const defaultProps = {
    open: true,
    positions: mockPositions,
    onClose: mockOnClose,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display the dialog', () => {
    render(<DistanceCalculationDialog { ...defaultProps } />);

    expect(screen.getByText('Distance entre deux positions')).toBeInTheDocument();
    expect(screen.getByLabelText('Position A')).toBeInTheDocument();
    expect(screen.getByLabelText('Position B')).toBeInTheDocument();
  });

  it('should calculate the distance between two positions', () => {
    render(<DistanceCalculationDialog { ...defaultProps } />);

    const positionASelect = screen.getByLabelText('Position A');
    fireEvent.mouseDown(positionASelect);
    const positionAListbox = screen.getAllByRole('listbox').at(-1);
    fireEvent.click(within(positionAListbox!).getByText('Paris (2.3522, 48.8566)'));

    const positionBSelect = screen.getByLabelText('Position B');
    fireEvent.mouseDown(positionBSelect);
    const positionBListbox = screen.getAllByRole('listbox').at(-1);
    fireEvent.click(within(positionBListbox!).getByText('Lyon (4.8357, 45.764)'));

    const calculateButton = screen.getByRole('button', { name: /calculer/i });
    fireEvent.click(calculateButton);

    expect(mockCalculateDistance).toHaveBeenCalledWith(
        mockPositions[0],
        mockPositions[1]
    );
    expect(screen.getByText('654.32 km')).toBeInTheDocument();
  });
});
