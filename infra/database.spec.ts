import { InMemoryDatabase } from '@/infra/database';

describe('Database', () => {
  test('should get positions', () => {
    const database = new InMemoryDatabase();

    expect(database.getPositions()).toEqual([{
      id: 0,
      name: 'First position',
      longitude: 10.2,
      latitude: 48.2
    }]);
  });

  test('should add a new position', () => {
    const database = new InMemoryDatabase();

    database.addOrUpdatePosition({
      name: 'Second position',
      longitude: 10.3,
      latitude: 48.3
    });

    expect(database.getPositions()).toEqual([
      {
        id: 0,
        name: 'First position',
        longitude: 10.2,
        latitude: 48.2
      },
      {
        id: 1,
        name: 'Second position',
        longitude: 10.3,
        latitude: 48.3
      }
    ])
  });

  test('should update an existing position', () => {
    const database = new InMemoryDatabase();

    database.addOrUpdatePosition({
      id: 0,
      name: 'Updated dirst position',
      longitude: 10.2,
      latitude: 48.2
    });

    expect(database.getPositions()).toEqual([{
      id: 0,
      name: 'Updated dirst position',
      longitude: 10.2,
      latitude: 48.2
    }]);
  });
});