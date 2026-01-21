'use client';

import { GpsPosition } from '@/app/domain/gps/position';
import { IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface GpsPositionsProps {
  positions: GpsPosition[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function GpsPositions(props: GpsPositionsProps) {
  const { positions, onEdit, onDelete } = props;

  return (
      <Stack spacing={ 2 }>
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
                  <TableCell>
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
      </Stack>
  )
}