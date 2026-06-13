import { useState, useEffect } from 'react';
import './GachaBall.css';

export default function GachaBall({ name, delay = 0 }) {
  const [phase, setPhase] = useState('dropping'); // dropping -> shaking -> cracking -> open

  useEffect(() => {
    // 순차적 애니메이션 페이즈 제어
    const t1 = setTimeout(() => setPhase('shaking'), delay + 500);
    const t2 = setTimeout(() => setPhase('cracking'), delay + 1500);
    const t3 = setTimeout(() => setPhase('open'), delay + 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [delay]);

  return (
    <div className="gacha-container">
      <div className={`gacha-ball ${phase}`}>
        <div className="ball-half top-half"></div>
        <div className="ball-half bottom-half"></div>
        
        <div className="note-container">
          <div className="paper-note">
            <span className="note-text">{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
