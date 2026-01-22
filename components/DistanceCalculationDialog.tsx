import { calculateDistanceBetweenTwoGpsPositions, GpsPosition } from '@/domain/gps/position';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel, MenuItem, Select, SelectChangeEvent,
  Stack, Typography
} from '@mui/material';
import { useState } from 'react';

export interface DistanceCalculationProps {
  open: boolean;
  positions: GpsPosition[];
  onClose: () => void;
}

export default function DistanceCalculationDialog(props: DistanceCalculationProps) {
  const { open, positions, onClose } = props;

  const [positionA, setPositionA] = useState('');
  const [positionB, setPositionB] = useState('');
  const [result, setResult] = useState<string>('-');

  const canCalculate = positionA !== '' && positionB !== '';

  const calculate = () => {
    const gpsPositionA = positions.find(p => p.id === Number(positionA));
    const gpsPositionB = positions.find(p => p.id === Number(positionB));
    const calculation = calculateDistanceBetweenTwoGpsPositions(gpsPositionA!, gpsPositionB!)
    setResult(calculation.toFixed(2) + ' km');
  }

  return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Distance entre deux positions</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="position-a">Position A</InputLabel>
              <Select
                  labelId="position-a"
                  id="position-a-select"
                  value={positionA}
                  label="Position A"
                  onChange={ (event: SelectChangeEvent) => {
                    setPositionA(event.target.value);
                  } }
              >
                <MenuItem value="">-</MenuItem>
                {positions.map(position => (
                    <MenuItem key={position.id} value={String(position.id)}>{ position.name } ({ position.longitude }, { position.latitude })</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="position-b">Position B</InputLabel>
              <Select
                  labelId="position-b"
                  id="position-b-select"
                  value={positionB}
                  label="Position B"
                  onChange={ (event: SelectChangeEvent) => {
                    setPositionB(event.target.value);
                  } }
              >
                <MenuItem value="">-</MenuItem>
                {positions.map(position => (
                    <MenuItem key={position.id} value={String(position.id)}>{ position.name } ({ position.longitude }, { position.latitude })</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack sx={{ my: 2 }}>
            <Typography><b>Résultat :</b> { result }</Typography>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Fermer</Button>
          <Button variant="contained" onClick={calculate} disabled={!canCalculate}>
            Calculer
          </Button>
        </DialogActions>
      </Dialog>
  );
}
