import { fireEvent, render, screen } from '../../testing/test-utils';
import CreateEditGpsPositionDialog from '../CreateEditGpsPositionDialog';
import { GpsPosition } from '@/domain/gps/position';

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();


describe('CreateEditGpsPositionDialog', () => {
  const defaultCreateProps = {
    open: true,
    editMode: false,
    onClose: mockOnClose,
    onSave: mockOnSave,
  };

  const mockPosition: GpsPosition = {
    id: 1,
    name: 'Test Position',
    longitude: 2.3522,
    latitude: 48.8566,
  };

  const defaultEditProps = {
    open: true,
    editMode: true,
    positionToEdit: mockPosition,
    onClose: mockOnClose,
    onSave: mockOnSave,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create', () => {

    it('should display the dialog', () => {
      render(<CreateEditGpsPositionDialog {...defaultCreateProps} />);

      expect(screen.getByText('Créer une position GPS')).toBeInTheDocument();
      expect(screen.getAllByText('Nom')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Position')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Sauvegarde')[0]).toBeInTheDocument();
    });

    it('should be able to save the form', () => {
      render(<CreateEditGpsPositionDialog {...defaultCreateProps} />);

      fireEvent.change(screen.getByLabelText('Nom'), {
        target: { value: 'Test Position' } 
      });
      fireEvent.click(screen.getByRole('button', { name: /suivant/i }));

      fireEvent.change(screen.getByLabelText('longitude'), {
        target: { value: '2.5' } 
      });
      fireEvent.change(screen.getByLabelText('Latitude'), { 
        target: { value: '48.9' } 
      });
      fireEvent.click(screen.getByRole('button', { name: /suivant/i }));

      fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

      expect(mockOnSave).toHaveBeenCalledWith({
        name: 'Test Position',
        longitude: 2.5,
        latitude: 48.9,
      });
    });
  });

  describe('Edit mode', () => {
    it('should have initial position id set when edit', () => {
      render(<CreateEditGpsPositionDialog {...defaultEditProps} />);

      fireEvent.click(screen.getByRole('button', { name: /suivant/i }));
      fireEvent.click(screen.getByRole('button', { name: /suivant/i }));

      fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

      expect(mockOnSave).toHaveBeenCalledWith({
        id: 1,
        name: 'Test Position',
        longitude: 2.3522,
        latitude: 48.8566,
      });
    });
  });

  it('should close the dialog', () => {
    render(<CreateEditGpsPositionDialog {...defaultCreateProps} />);

    fireEvent.click(screen.getByRole('button', { name: /annuler/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
