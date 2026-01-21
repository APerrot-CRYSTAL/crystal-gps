'use client';

import { GpsPosition } from '@/app/domain/gps/position';
import {
  Button,
  Card,
  CardContent, Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Tooltip,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export interface GpsPositionsProps {
  positions: GpsPosition[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  onOpenCalculateDialog: () => void;
}

export default function GpsPositions(props: GpsPositionsProps) {
  const { positions, onEdit, onDelete, onCreate, onOpenCalculateDialog } = props;

  return (
      <Stack spacing={ 2 }>
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap" marginY={2}>
              <Typography variant="h4">Positions</Typography>

              <Stack direction="row" gap={ 1 } alignItems="center">
                <Button
                    variant="outlined"
                    disabled={ positions.length < 2 }
                    onClick={ onOpenCalculateDialog }
                >
                  Calculer une distance entre 2 positions
                </Button>

                <Button variant="contained" startIcon={ <AddIcon/> } onClick={ onCreate }>
                  Créer
                </Button>
              </Stack>
            </Stack>

            <Divider variant="middle" />

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 800 } }>Name</TableCell>
                  <TableCell sx={ { fontWeight: 800 } }>Longitude</TableCell>
                  <TableCell sx={ { fontWeight: 800 } }>Latitude</TableCell>
                  <TableCell sx={ { fontWeight: 800 } } align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                { positions.map(position => (
                    <TableRow key={ position.id }>
                      <TableCell>{ position.name }</TableCell>
                      <TableCell>{ position.longitude }</TableCell>
                      <TableCell>{ position.latitude }</TableCell>
                      <TableCell align="right">
                        <IconButton aria-label={ `edit-${ position.name }` } onClick={ () => onEdit(position.id) }>
                          <EditIcon fontSize="small"/>
                        </IconButton>
                        <IconButton aria-label={ `delete-${ position.name }` } onClick={ () => onDelete(position.id) }>
                          <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                )) }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Stack>
  )
}