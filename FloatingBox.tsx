
import React, { useState, useEffect, useRef } from 'react';
import { PredictionState } from '../types';
import { getCurrentPeriodId, runSmartPrediction } from '../services/apiService';
import { Zap, Binary, Lock, Activity, Cpu, Move, Maximize2 } from 'lucide-react';

const FloatingBox: React.FC = () => {
  const [state, setState] = useState<PredictionState>({
    periodId: getCurrentPeriodId(),
    prediction: null,
    lastGeneratedPeriod: null,
    isAnalyzing: false,
    heatmap: Array(10).fill(0)
  });

  const [pos, setPos] = useState({ x: 20, y: 100 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      const newId = getCurrentPeriodId();
      if (newId !== state.periodId) {
        setState(prev => ({ ...prev, periodId: newId, prediction: null }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [state.periodId]);

  const handleGuess = async () => {
    if (state.lastGeneratedPeriod === state.periodId) {
      alert("Signal already used! Wait for next period.");
      return;
    }
    setState(prev => ({ ...prev, isAnalyzing: true }));
    const { result, heatmap } = await runSmartPrediction();
    setState(prev => ({
      ...prev,
      prediction: result,
      heatmap,
      isAnalyzing: false,
      lastGeneratedPeriod: prev.periodId
    }));
  };

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX - pos.x, y: clientY - pos.y };
  };

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      setPos({ x: clientX - dragStart.current.x, y: clientY - dragStart.current.y });
    };
    const end = () => setIsDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [isDragging]);

  const isLocked = state.lastGeneratedPeriod === state.periodId;

  return (
    <div 
      className="fixed z-[1000] select-none touch-none"
      style={{ 
        left: pos.x, 
        top: pos.y, 
        transform: `scale(${scale})`, 
        transformOrigin: 'top left' 
      }}
    >
      <div className="w-72 bg-black/90 border-2 border-red-600 rounded shadow-[0_0_30px_rgba(255,0,0,0.4)] overflow-hidden">
        {/* Header / Drag Bar */}
        <div 
          className="bg-red-600 p-2 flex items-center justify-between cursor-move"
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        >
          <div className="flex items-center gap-1">
            <Activity size={12} className="text-black animate-pulse" />
            <span className="text-[10px] font-bold text-black uppercase tracking-tighter">Smart Predictor v3.0</span>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="range" min="0.5" max="2" step="0.1" value={scale} 
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-16 h-1 bg-black rounded-lg appearance-none cursor-pointer"
            />
            <Move size={12} className="text-black" />
          </div>
        </div>

        <div className="p-3 space-y-3 relative">
          <div className="hacker-bg"></div>
          
          {/* Analysis Overlay during scanning */}
          {state.isAnalyzing && (
            <div className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center">
              <div className="scrolling-code text-[8px] text-green-500 font-mono text-center leading-tight">
                {Array(20).fill("Hackered by Mr team\nMr Jim Hack\nInjecting Core Logic\n").join("")}
              </div>
              <Cpu size={32} className="text-red-600 animate-spin absolute" />
            </div>
          )}

          {/* Period ID */}
          <div className="bg-red-950/20 border border-red-600/30 p-2 rounded text-center">
            <div className="text-[8px] text-red-800 uppercase font-bold tracking-[0.2em] mb-1">Session ID</div>
            <div className="text-sm font-bold text-red-500 tracking-wider font-mono">
              {state.periodId}
            </div>
          </div>

          {/* Result Area */}
          <div className="h-20 bg-black/60 border border-red-900/50 flex flex-col items-center justify-center rounded">
            {state.prediction ? (
              <div className="flex flex-col items-center animate-[zoom-in_0.3s]">
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-black ${state.prediction.size === 'BIG' ? 'text-yellow-500' : 'text-blue-500'}`}>
                    {state.prediction.size}
                  </span>
                  <span className="text-gray-700">|</span>
                  <span className={`text-2xl font-black ${state.prediction.color === 'GREEN' ? 'text-green-500' : 'text-red-600'}`}>
                    {state.prediction.color}
                  </span>
                </div>
                <div className="text-[8px] text-red-500 font-bold uppercase tracking-[0.3em] mt-1">
                  Confidence: {state.prediction.probability}%
                </div>
              </div>
            ) : (
              <div className="opacity-30 flex flex-col items-center">
                <Lock size={20} className="text-gray-600" />
                <span className="text-[8px] uppercase font-bold tracking-widest text-gray-500 mt-1">Input Required</span>
              </div>
            )}
          </div>

          {/* Guess Button */}
          <button
            onClick={handleGuess}
            disabled={state.isAnalyzing || isLocked}
            className={`w-full py-2 text-xs horror-font border-2 transition-all relative overflow-hidden group ${
              isLocked 
                ? 'bg-gray-900 border-gray-800 text-gray-800'
                : 'bg-red-950/20 border-red-600 text-red-600 hover:bg-red-600 hover:text-black shadow-[0_0_15px_rgba(153,0,0,0.3)]'
            }`}
          >
            {isLocked ? "LOCKED" : "GUESS RESULT"}
          </button>

          {/* Heatmap */}
          <div className="grid grid-cols-5 gap-1 pt-1 border-t border-red-900/20">
            {state.heatmap.map((prob, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-red-500/50 mb-1">{i}</div>
                <div className="w-full h-8 bg-gray-900 rounded-sm relative overflow-hidden">
                  <div 
                    className="absolute bottom-0 w-full bg-red-600/50 transition-all duration-1000"
                    style={{ height: `${prob}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingBox;
