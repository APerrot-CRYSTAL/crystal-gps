'use client';

import { Container, Stack } from '@mui/material';
import GpsPositions from '@/app/components/GpsPositions';
import { GpsPosition } from '@/app/domain/gps/position';

const positions: GpsPosition[] = [];

export default function Home() {
  const onEdit = (id: string) => {}

  const onDelete = (id: string) => {}

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={2}>
        <GpsPositions
            positions={positions}
            onEdit={onEdit}
            onDelete={onDelete}
        ></GpsPositions>
      </Stack>
    </Container>
  );
}
