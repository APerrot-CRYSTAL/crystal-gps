import { GpsPosition } from '@/app/domain/gps/position';

export type Subscriber = () => void;

export class InMemoryDatabase {
  private subscribers: Subscriber[] = [];
  private gpsPositions: GpsPosition[] = [
    {
      id: 0,
      name: 'First position',
      longitude: 10.2,
      latitude: 48.2
    }
  ]

  constructor() {
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers = [...this.subscribers, subscriber];
    return () => {
      this.subscribers = this.subscribers.filter(l => l !== subscriber);
    };
  }

  getPositions(): GpsPosition[] {
    return this.gpsPositions;
  }

  getById(id: number | null): GpsPosition | undefined {
    if (id === null) {
      return undefined;
    }

    return this.gpsPositions.find(p => p.id === id);
  }

  addOrUpdatePosition(position: GpsPosition) {
    const newPositionState = {
      ...position,
      id: position.id !== undefined ? position.id : this.gpsPositions.length
    };

    this.gpsPositions = [
        ...this.gpsPositions.filter(p => p.id !== position.id),
        newPositionState
    ];
    this.subscribers.forEach(subscriber => subscriber());
  }

  delete(id: number) {
    this.gpsPositions = this.gpsPositions.filter(p => p.id !== id);
    this.subscribers.forEach(subscriber => subscriber());
  }
}

const positionStore = new InMemoryDatabase();
export default positionStore;