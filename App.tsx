
import React, { useState } from 'react';
import ZombieLogin from './components/ZombieLogin';
import FloatingBox from './components/FloatingBox';
import { UserAuthStatus } from './types';

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<UserAuthStatus>('UNAUTHENTICATED');

  const onUnlock = () => {
    setAuthStatus('AUTHENTICATED');
  };

  if (authStatus !== 'AUTHENTICATED') {
    return <ZombieLogin onUnlock={onUnlock} />;
  }

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Target Game Iframe */}
      <iframe 
        src="https://dkwin0.com/#/register?invitationCode=23242918192" 
        className="w-full h-full border-none"
        title="WinGo Game"
        allow="autoplay; clipboard-read; clipboard-write"
      />
      
      {/* Floating Smart Predictor UI */}
      <FloatingBox />

      {/* Decorative Overlay for Hacker Vibe */}
      <div className="fixed top-2 right-2 pointer-events-none opacity-20">
        <div className="flex items-center gap-2">
           <div className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Neural Stream Linked</div>
           <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
