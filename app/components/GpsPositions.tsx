'use client';

import { GpsPosition } from '@/app/domain/gps/position';
import { Stack, Table, TableBody, TableCell, TableHead } from '@mui/material';

export interface GpsPositionsProps {
  positions: GpsPosition[];
}

export default function GpsPositions(props: GpsPositionsProps) {
  const { positions } = props;

  return (
      <Stack spacing={2}>
        <Table>
          <TableHead>
            <TableCell sx={{ fontWeight: 800 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Longitude</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Latitude</TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="right">Action</TableCell>
          </TableHead>

          <TableBody>
            {/*{positions.map(position => (*/}
            {/*    */}
            {/*))}*/}
          </TableBody>
        </Table>
      </Stack>
  )
}