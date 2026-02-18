
export type UserAuthStatus = 'UNAUTHENTICATED' | 'SCARED' | 'AUTHENTICATED';

// Enum for user status tracking in firebase service
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED'
}

export interface PredictionResult {
  size: 'BIG' | 'SMALL';
  color: 'GREEN' | 'RED';
  probability: number;
  votes?: { big: number; green: number };
}

// Result structure for WinGo game history
export interface WinGoResult {
  issueNumber: string;
  number: number;
  size: 'BIG' | 'SMALL';
  color: 'green' | 'red' | 'violet';
}

export interface WinGoHistory {
  issueNumber: string;
  number: number;
  size: 'BIG' | 'SMALL';
  color: 'GREEN' | 'RED' | 'VIOLET';
}

export interface PredictionState {
  periodId: string;
  prediction: PredictionResult | null;
  lastGeneratedPeriod: string | null;
  isAnalyzing: boolean;
  heatmap: number[];
}

// Game state for the hacker dashboard component
export interface GameState {
  periodId: string;
  prediction: PredictionResult | null;
  lastGeneratedPeriod: string | null;
  isAnalyzing: boolean;
}

// Map for number probabilities used in heatmap
export interface ProbabilityMap {
  [key: number]: number;
}

// API response structure for WinGo history data
export interface HistoryResponse {
  data: {
    list: Array<{
      issueNumber: string;
      number: string;
      colour: string;
    }>;
  };
}
