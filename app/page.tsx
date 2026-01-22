'use client';

import { Container, Stack } from '@mui/material';
import GpsPositions from '@/components/GpsPositions';
import positionStore from '@/infra/database';
import React, { useState } from 'react';
import CreateEditGpsPositionDialog from '@/components/CreateEditGpsPositionDialog';
import { GpsPosition } from '@/domain/gps/position';
import DistanceCalculationDialog from '@/components/DistanceCalculationDialog';
import { positions } from '@mui/system';

const usePositions = () => {
  return React.useSyncExternalStore(
      (subscriber) => positionStore.subscribe(subscriber),
      () => positionStore.getPositions(),
      () => positionStore.getPositions()
  );
}

export default function Home() {
  const gpsPositions = usePositions();

  const [showCreateEditPositionDialog, setShowCreateEditPositionDialog] = useState(false);
  const [positionToEditId, setPositionToEditId] = useState<number | null>(null);
  const [createEditDialogKey, setCreateEditDialogKey] = useState(0);

  const [showCalculateDialog, setShowCalculateDialog] = useState(false);

  const onCreate = () => {
    setPositionToEditId(null);
    setShowCreateEditPositionDialog(true);
  }

  const onSave = (position: GpsPosition) => {
    positionStore.addOrUpdatePosition(position);
    setShowCreateEditPositionDialog(false);
  }

  const onEdit = (id: number) => {
    setPositionToEditId(id);
    setShowCreateEditPositionDialog(true);
  }

  const onDelete = (id: number) => {
    positionStore.delete(id);
  }

  const onClose = () => {
    setShowCreateEditPositionDialog(false);
    setPositionToEditId(null);
  }

  const onOpenCalculateDialog = () => {
    setShowCalculateDialog(true);
  }

  const onCloseCalculateDialog = () => {
    setShowCalculateDialog(false);
  }

  return (
      <Container maxWidth="md" sx={ { py: 4 } }>
        <Stack spacing={ 2 }>
          <GpsPositions
              positions={ gpsPositions }
              onCreate={ onCreate }
              onEdit={ onEdit }
              onDelete={ onDelete }
              onOpenCalculateDialog={ onOpenCalculateDialog }
          ></GpsPositions>
        </Stack>
        
        <CreateEditGpsPositionDialog
            key={`${showCreateEditPositionDialog ? 'open' : 'closed'}-${positionToEditId || 'new'}`}
            open={showCreateEditPositionDialog}
            editMode={positionToEditId !== null}
            positionToEdit={positionStore.getById(positionToEditId)}
            onClose={onClose}
            onSave={onSave}
        ></CreateEditGpsPositionDialog>

        <DistanceCalculationDialog
            open={showCalculateDialog}
            positions={gpsPositions}
            onClose={onCloseCalculateDialog}
        >
        </DistanceCalculationDialog>
      </Container>
  );
}
