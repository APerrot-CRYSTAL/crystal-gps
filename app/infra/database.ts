import { GpsPosition } from '@/app/domain/gps/position';

export class InMemoryDatabase {
  constructor(private gpsPositions: GpsPosition[] = []) {
  }
}

export const GpsDatabase = new InMemoryDatabase();