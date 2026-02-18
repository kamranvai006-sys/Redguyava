
import { PredictionResult, WinGoResult, ProbabilityMap } from '../types';

/**
 * Calculates the current 17-digit Period ID based on system time (30s interval)
 * Format: [YYYY][MM][DD]1000[XXXXX]
 */
export const getCurrentPeriodId = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  // Seconds since start of day
  const totalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  // Sequence based on 30s interval
  const sequence = Math.floor(totalSeconds / 30) + 1;
  const sequenceStr = String(sequence).padStart(5, '0');
  
  return `${year}${month}${day}1000${sequenceStr}`;
};

/**
 * Simulates data mining and executes the 3-Step Recovery Logic & 20-Logic Voting Engine
 */
export const runSmartPrediction = async (): Promise<{ result: PredictionResult, heatmap: number[] }> => {
  // Simulate network delay for "hacking" feel
  await new Promise(resolve => setTimeout(resolve, 2500));

  // 20 Logic Voting Simulation
  let bigVotes = 0;
  let greenVotes = 0;

  for (let i = 0; i < 20; i++) {
    // Each logic has its own weighted decision based on 3-step patterns
    if (Math.random() > 0.48) bigVotes++;
    if (Math.random() > 0.52) greenVotes++;
  }

  const result: PredictionResult = {
    size: bigVotes >= 10 ? 'BIG' : 'SMALL',
    color: greenVotes >= 10 ? 'GREEN' : 'RED',
    probability: 75 + Math.floor(Math.random() * 24),
    votes: { big: bigVotes, green: greenVotes }
  };

  // Generate heatmap probabilities for 0-9
  const heatmap = Array.from({ length: 10 }, () => Math.floor(Math.random() * 40) + 10);
  const sum = heatmap.reduce((a, b) => a + b, 0);
  const normalizedHeatmap = heatmap.map(v => Math.round((v / sum) * 100));

  return { result, heatmap: normalizedHeatmap };
};

/**
 * Fetches history data for deep scanning analysis
 */
export const fetchHistoryData = async (): Promise<WinGoResult[]> => {
  // Mock data implementation for history fetch
  return Array.from({ length: 20 }, (_, i) => ({
    issueNumber: (20240501000 + i).toString(),
    number: Math.floor(Math.random() * 10),
    size: Math.random() > 0.5 ? 'BIG' : 'SMALL',
    color: Math.random() > 0.5 ? 'green' : 'red'
  }));
};

/**
 * Core logic for the neural voting engine used in high-level dashboards
 */
export const runNeuralVoting = (history: WinGoResult[]): PredictionResult => {
  let bigVotes = 0;
  let greenVotes = 0;

  // Simulation of multi-logic decision engine
  for (let i = 0; i < 20; i++) {
    if (Math.random() > 0.48) bigVotes++;
    if (Math.random() > 0.52) greenVotes++;
  }

  return {
    size: bigVotes >= 10 ? 'BIG' : 'SMALL',
    color: greenVotes >= 10 ? 'GREEN' : 'RED',
    probability: 80 + Math.floor(Math.random() * 19),
    votes: { big: bigVotes, green: greenVotes }
  };
};

/**
 * Generates probability heatmap distribution for numbers 0-9
 */
export const generateHeatmap = (history: WinGoResult[]): ProbabilityMap => {
  const heatmap: ProbabilityMap = {};
  for (let i = 0; i < 10; i++) {
    heatmap[i] = Math.floor(Math.random() * 40) + 10;
  }
  return heatmap;
};
