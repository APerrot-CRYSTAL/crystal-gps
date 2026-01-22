import { fireEvent, render, screen } from '../../testing/test-utils';
import GpsPositions from '../GpsPositions';
import { GpsPosition } from '@/domain/gps/position';

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
const mockOnCreate = jest.fn();
const mockOnOpenCalculateDialog = jest.fn();

describe('GpsPositions', () => {
  const mockPositions: GpsPosition[] = [
    { id: 1, name: 'Paris', longitude: 2.3522, latitude: 48.8566 },
    { id: 2, name: 'Lyon', longitude: 4.8357, latitude: 45.7640 },
  ];

  const defaultProps = {
    positions: mockPositions,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
    onCreate: mockOnCreate,
    onOpenCalculateDialog: mockOnOpenCalculateDialog,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display the table', () => {
    render(<GpsPositions {...defaultProps} />);

    expect(screen.getByText('Positions')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Longitude')).toBeInTheDocument();
    expect(screen.getByText('Latitude')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('2.3522')).toBeInTheDocument();
    expect(screen.getByText('48.8566')).toBeInTheDocument();
    expect(screen.getByText('Lyon')).toBeInTheDocument();
    expect(screen.getByText('4.8357')).toBeInTheDocument();
    expect(screen.getByText('45.764')).toBeInTheDocument();
  });

  it('should call on create when click on button', () => {
    render(<GpsPositions {...defaultProps} />);

    const createButton = screen.getByRole('button', { name: /créer/i });
    fireEvent.click(createButton);

    expect(mockOnCreate).toHaveBeenCalledTimes(1);
  });

  it('should call on edit when click on edit button', () => {
    render(<GpsPositions {...defaultProps} />);

    const editButton = screen.getByLabelText('edit-Paris');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(1);
  });

  it('should call on delete when click on delete button', () => {
    render(<GpsPositions {...defaultProps} />);

    const deleteButton = screen.getByLabelText('delete-Paris');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
