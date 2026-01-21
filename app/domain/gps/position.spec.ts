import { calculateDistanceBetweenTwoGpsPositions } from '@/app/domain/gps/position';

describe('GPS position', () => {
  describe('calculate distance between two positions using haversine formula', () => {
    test('should return distance in km', () => {
      const a = { id: 0, name: 'One', latitude: 52.2296756, longitude: 21.0122287 };
      const b = { id: 1, name: 'Second', latitude: 52.406374, longitude: 16.9251681 };

      const distance = calculateDistanceBetweenTwoGpsPositions(a, b);

      expect(distance).toBeCloseTo(278.45817507541943);
    })
  })
})