'use client';

import { GpsPosition } from '@/app/domain/gps/position';
import { Stack } from '@mui/material';

export interface GpsPositionsProps {
  positions: GpsPosition[];
}

export default function GpsPositions(props: GpsPositionsProps) {
  return (
      <Stack spacing={2}>
        Here are my positions
      </Stack>
  )
}