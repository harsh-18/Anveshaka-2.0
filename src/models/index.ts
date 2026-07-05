export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export interface RegionData {
  id: string;
  name: string;
  bedsAvailable: number;
  bedsTotal: number;
  ventilatorsAvailable: number;
  staffingLevel: 'Critical' | 'Warning' | 'Optimal';
  recentAnomalies: number;
}

export interface IHealthDataService {
  getRegions(): Promise<RegionData[]>;
  getRegionById(id: string): Promise<RegionData | undefined>;
  getRegionsByStaffingLevel(level: RegionData['staffingLevel']): Promise<RegionData[]>;
}

export interface ChatContext {
  state: string;
  district: string;
  metrics: any;
}

export interface IChatService {
  sendMessage(content: string, history: Message[], context?: ChatContext): Promise<string>;
}
