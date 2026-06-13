import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import './SlotMachine.css';

export default function SlotMachine({ students, onComplete, drawCount = 1 }) {
  const [phase, setPhase] = useState('idle'); // idle, spinning, result

  const handleStart = async () => {
    if (students.length === 0) {
      alert('학생 명단을 먼저 추가해주세요!');
      return;
    }
    
    setPhase('spinning');
    
    // 2.5초간 가챠볼 섞기 애니메이션
    setTimeout(() => {
      setPhase('result');
      onComplete();
    }, 2500);
  };

  const reset = () => {
    setPhase('idle');
  };

  // 더미 가챠볼 생성
  const dummyBalls = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    color: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][i % 6]
  }));

  return (
    <div className="gacha-machine-container glass-panel">
      {phase === 'idle' && (
        <div className="idle-state">
          <div className="gacha-machine-ui">
            <div className="gacha-dome">
              {dummyBalls.map(ball => (
                <div key={ball.id} className="mini-ball idle-ball" style={{ background: ball.color }} />
              ))}
            </div>
            <div className="gacha-base">
              <div className="gacha-knob"></div>
              <div className="gacha-dispenser"></div>
            </div>
          </div>
          <button className="btn-spin" onClick={handleStart} disabled={students.length === 0}>
            <Play fill="currentColor" size={24} />
            <span>가차 뽑기</span>
          </button>
        </div>
      )}

      {phase === 'spinning' && (
        <div className="spinning-state">
          <div className="gacha-machine-ui active">
            <div className="gacha-dome shake-dome">
              {dummyBalls.map(ball => (
                <div 
                  key={ball.id} 
                  className="mini-ball bouncing-ball" 
                  style={{ 
                    background: ball.color,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${0.3 + Math.random() * 0.4}s`
                  }} 
                />
              ))}
            </div>
            <div className="gacha-base">
              <div className="gacha-knob spinning-knob"></div>
              <div className="gacha-dispenser dropping-animation"></div>
            </div>
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className="result-state">
          <button className="btn-reset" onClick={reset}>다시 뽑기</button>
        </div>
      )}
    </div>
  );
}
