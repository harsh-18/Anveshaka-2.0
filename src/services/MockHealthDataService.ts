import { IHealthDataService, RegionData } from '../models';

const MOCK_REGIONS: RegionData[] = [
  {
    id: 'reg-01',
    name: 'North District Hospital',
    bedsAvailable: 12,
    bedsTotal: 150,
    ventilatorsAvailable: 2,
    staffingLevel: 'Critical',
    recentAnomalies: 3,
  },
  {
    id: 'reg-02',
    name: 'Central Medical Center',
    bedsAvailable: 45,
    bedsTotal: 300,
    ventilatorsAvailable: 15,
    staffingLevel: 'Optimal',
    recentAnomalies: 0,
  },
  {
    id: 'reg-03',
    name: 'East Valley Clinic',
    bedsAvailable: 5,
    bedsTotal: 50,
    ventilatorsAvailable: 0,
    staffingLevel: 'Warning',
    recentAnomalies: 1,
  },
  {
    id: 'reg-04',
    name: 'Southside General',
    bedsAvailable: 22,
    bedsTotal: 200,
    ventilatorsAvailable: 8,
    staffingLevel: 'Warning',
    recentAnomalies: 2,
  },
  {
    id: 'reg-05',
    name: 'West Point Trauma',
    bedsAvailable: 8,
    bedsTotal: 120,
    ventilatorsAvailable: 1,
    staffingLevel: 'Critical',
    recentAnomalies: 5,
  },
];

export class MockHealthDataService implements IHealthDataService {
  async getRegions(): Promise<RegionData[]> {
    return Promise.resolve(MOCK_REGIONS);
  }

  async getRegionById(id: string): Promise<RegionData | undefined> {
    return Promise.resolve(MOCK_REGIONS.find(r => r.id === id));
  }

  async getRegionsByStaffingLevel(level: RegionData['staffingLevel']): Promise<RegionData[]> {
    return Promise.resolve(MOCK_REGIONS.filter(r => r.staffingLevel === level));
  }
}
