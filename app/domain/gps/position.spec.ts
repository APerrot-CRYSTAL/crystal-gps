import { generateIdFromPositionName, GpsPosition } from '@/app/domain/gps/position';

describe('position tests', () => {
  test('should generate position id from name when there are spaces', () => {
    const position: GpsPosition = {
      name: 'my position',
      longitude: 0,
      latitude: 0
    }

    const id = generateIdFromPositionName(position);

    expect(id).toBe('my_position')
  });

  test('should generate position id from name with removed special characters', () => {
    const position: GpsPosition = {
      name: 'my position with spécial châracters',
      longitude: 0,
      latitude: 0
    }

    const id = generateIdFromPositionName(position);

    expect(id).toBe('my_position_with_spcial_chracters')
  });
})