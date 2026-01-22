import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField, Typography
} from '@mui/material';
import { useState } from 'react';
import { GpsPosition } from '@/domain/gps/position';
import SaveIcon from '@mui/icons-material/Save';

export interface CreateEditGpsPositionProps {
  open: boolean;
  editMode: boolean;
  positionToEdit?: GpsPosition;
  onClose: () => void;
  onSave: (position: GpsPosition) => void;
}

export default function CreateEditGpsPositionDialog(props: CreateEditGpsPositionProps) {
  const { open, editMode, positionToEdit, onClose, onSave } = props;

  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{ id?: number; name: string; latitude: string; longitude: string; }>({
    id: editMode && positionToEdit ? positionToEdit.id : undefined,
    name: editMode && positionToEdit ? positionToEdit.name : '',
    latitude: editMode && positionToEdit ? String(positionToEdit.latitude) : '',
    longitude: editMode && positionToEdit ? String(positionToEdit.longitude) : ''
  });

  const next = () => setStep((step) => Math.min(2, step + 1));
  const previous = () => setStep((step) => Math.max(0, step - 1));

  return (
      <Dialog open={ open } onClose={ onClose } maxWidth="sm" fullWidth>
        <DialogTitle sx={ { fontWeight: 800 } }>{ editMode ? 'Mettre à jour' : 'Créer' } une position GPS</DialogTitle>

        <DialogContent>
          <Stepper activeStep={ step } sx={ { py: 2 } }>
            <Step><StepLabel>Nom</StepLabel></Step>
            <Step><StepLabel>Position</StepLabel></Step>
            <Step><StepLabel>Sauvegarde</StepLabel></Step>
          </Stepper>

          { step === 0 && <Stack spacing={ 2 }>
              <TextField
                  label="Nom"
                  value={ position.name }
                  onChange={ (e) => setPosition((position) => ({ ...position, name: e.target.value })) }
              />
          </Stack> }

          { step === 1 && <Stack spacing={ 2 }>
              <TextField
                  label="longitude"
                  value={ position.longitude }
                  onChange={ (e) => setPosition((position) => ({ ...position, longitude: e.target.value })) }
              />
              <TextField
                  label="Latitude"
                  value={ position.latitude }
                  onChange={ (e) => setPosition((position) => ({ ...position, latitude: e.target.value })) }
              />
          </Stack> }

          { step === 2 && <Stack spacing={ 2 }>
              <Typography><b>Nom :</b> { position.name || '—' }</Typography>
              <Typography><b>Latitude :</b> { position.latitude || '—' }</Typography>
              <Typography><b>Longitude :</b> { position.longitude || '—' }</Typography>
          </Stack> }
        </DialogContent>

        <DialogActions>
          <Button onClick={ onClose }>Annuler</Button>

          { step > 0 && <Button onClick={ previous }>Retour</Button> }

          { step === 0 && (
              <Button
                  variant="contained"
                  onClick={ () => {
                    next()
                  } }
              >
                Suivant
              </Button>
          ) }

          { step === 1 && (
              <Button
                  variant="contained"
                  onClick={ () => {
                    next()
                  } }
              >
                Suivant
              </Button>
          ) }

          { step === 2 && (
              <Button variant="contained" startIcon={ <SaveIcon/> } onClick={ () => onSave({
                ...position,
                longitude: parseFloat(position.longitude),
                latitude: parseFloat(position.latitude)
              }) }>
                Enregistrer
              </Button>
          ) }
        </DialogActions>
      </Dialog>
  )
}