import Image from "next/image";
import { Container, Stack } from '@mui/material';
import GpsPositions from '@/app/components/GpsPositions';
import { GpsPosition } from '@/app/domain/gps/position';

const positions: GpsPosition[] = [];

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={2}>
        <GpsPositions positions={positions}></GpsPositions>
      </Stack>
    </Container>
  );
}
