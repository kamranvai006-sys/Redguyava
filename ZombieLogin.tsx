
import React, { useState } from 'react';
import { Skull, Ghost, Lock } from 'lucide-react';

interface Props {
  onUnlock: () => void;
}

const ZombieLogin: React.FC<Props> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [scared, setScared] = useState(false);

  const handleInput = (val: string) => {
    setPassword(val);
    if (val.toUpperCase() === 'MR') {
      setScared(true);
      setTimeout(() => {
        onUnlock();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050000] flex items-center justify-center z-[2000] overflow-hidden">
      {/* Background Zombies */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="zombie-hand top-10 left-10 scale-[2.5]" style={{ animationDelay: '0s' }}>
          <Skull size={100} />
        </div>
        <div className="zombie-hand bottom-40 right-10 scale-[3.5]" style={{ animationDelay: '2s' }}>
          <Skull size={120} />
        </div>
        <div className="zombie-hand top-1/2 left-1/3 scale-[1.5]" style={{ animationDelay: '1s' }}>
          <Skull size={80} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm p-10 bg-black border-2 border-red-600 shadow-[0_0_80px_rgba(153,0,0,0.6)] rounded-none flex flex-col items-center">
        <div className="mb-6">
           <Skull size={64} className="text-red-700 animate-pulse" />
        </div>
        <h1 className="horror-font text-red-600 text-3xl mb-12 text-center animate-pulse tracking-tighter">
          MR TRADERS<br/>COMMUNITY
        </h1>
        
        <div className="w-full space-y-6">
          <label className="block text-red-900 text-[10px] uppercase tracking-[0.5em] font-bold text-center">
            Identify Biological Signal
          </label>
          <div className="relative">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => handleInput(e.target.value)}
              className="w-full bg-red-950/10 border-b-2 border-red-900 text-red-600 p-4 focus:outline-none focus:border-red-500 transition-all text-center text-3xl tracking-[1em] font-black"
              placeholder="??"
            />
            <Lock className="absolute right-2 top-1/2 -translate-y-1/2 text-red-900" size={16} />
          </div>
        </div>

        <div className="mt-12 text-[8px] text-red-950 uppercase font-bold tracking-[0.4em] text-center leading-loose">
          Unauthorized access will trigger<br/>Permanent Neural Termination
        </div>
      </div>

      {scared && (
        <div className="fixed inset-0 z-[3000] bg-black flex items-center justify-center">
          <div className="absolute inset-0 screen-crack scale-150"></div>
          <div className="relative ghost-booth">
            <Ghost size={500} className="text-white opacity-90" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 horror-font text-white text-9xl whitespace-nowrap drop-shadow-[0_0_50px_#fff]">
              MR JIM
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZombieLogin;
