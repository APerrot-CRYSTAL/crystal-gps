'use client';

import { Container, Stack } from '@mui/material';
import GpsPositions from '@/app/components/GpsPositions';
import positionStore from '@/app/infra/database';
import React, { useState } from 'react';
import CreateEditGpsPosition from '@/app/components/CreateEditGpsPosition';
import { GpsPosition } from '@/app/domain/gps/position';

const usePositions = () => {
  return React.useSyncExternalStore(
      (subscriber) => positionStore.subscribe(subscriber),
      () => positionStore.getPositions(),
      () => positionStore.getPositions()
  );
}

export default function Home() {
  const gpsPositions = usePositions();

  const [showCreateEditPosition, setShowCreateEditPosition] = useState(false);
  const [positionToEditId, setPositionToEditId] = useState<number | null>(null);
  const [createEditDialogKey, setCreateEditDialogKey] = useState(0);

  const onCreate = () => {
    setPositionToEditId(null);
    setShowCreateEditPosition(true);
  }

  const onSave = (position: GpsPosition) => {
    positionStore.addOrUpdatePosition(position);
    setShowCreateEditPosition(false);
  }

  const onEdit = (id: number) => {
    setPositionToEditId(id);
    setShowCreateEditPosition(true);
  }

  const onDelete = (id: number) => {
    positionStore.delete(id);
  }

  const onClose = () => {
    setShowCreateEditPosition(false);
    setPositionToEditId(null);
  }

  return (
      <Container maxWidth="md" sx={ { py: 4 } }>
        <Stack spacing={ 2 }>
          <GpsPositions
              positions={ gpsPositions }
              onCreate={ onCreate }
              onEdit={ onEdit }
              onDelete={ onDelete }
          ></GpsPositions>
        </Stack>
        
        <CreateEditGpsPosition
            key={`${showCreateEditPosition ? 'open' : 'closed'}-${positionToEditId || 'new'}`}
            open={showCreateEditPosition}
            editMode={positionToEditId !== null}
            positionToEdit={positionStore.getById(positionToEditId)}
            onClose={onClose}
            onSave={onSave}
        ></CreateEditGpsPosition>
      </Container>
  );
}
