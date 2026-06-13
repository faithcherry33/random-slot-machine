import { useState, useEffect, useCallback } from 'react';
import { useStudents } from './hooks/useStudents';
import { useSecretQueue } from './hooks/useSecretQueue';
import StudentManager from './components/StudentManager';
import SlotMachine from './components/SlotMachine';
import SecretModal from './components/SecretModal';
import GachaBall from './components/GachaBall';
import './App.css';

function App() {
  const { students, addStudentsBulk, removeStudent, clearStudents } = useStudents();
  const { secretQueue, addToQueue, removeFromQueue, popFromQueue } = useSecretQueue();
  
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [drawCount, setDrawCount] = useState(1);
  const [results, setResults] = useState([]);
  const [showBalls, setShowBalls] = useState(false);

  // 시크릿 단축키 처리
  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'r' || e.key === 'R')) {
      e.preventDefault();
      setIsSecretModalOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleDrawComplete = () => {
    // 슬롯 회전 후 이 함수가 호출됨. 결과 계산.
    let finalResults = [];
    
    // 1. 시크릿 큐 우선 처리
    if (secretQueue.length > 0) {
      const popped = popFromQueue(drawCount);
      finalResults = [...popped];
    }
    
    // 2. 남은 인원수만큼 랜덤 추출
    const remainingCount = drawCount - finalResults.length;
    if (remainingCount > 0) {
      // 이미 뽑힌 사람 제외 (시크릿 큐에 있던 사람 포함)
      const availableStudents = students.filter(s => !finalResults.includes(s));
      
      const shuffled = [...availableStudents].sort(() => 0.5 - Math.random());
      finalResults = [...finalResults, ...shuffled.slice(0, remainingCount)];
    }

    // 만약 전체 학생 수보다 뽑을 인원이 많다면? 중복 허용 처리 또는 그냥 최대치로 제한.
    // 여기서는 뽑을 수 있는 만큼만.
    
    setResults(finalResults);
    setShowBalls(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎲 랜덤 가차 뽑기</h1>
        <div className="settings">
          <label>추출 인원:</label>
          <input 
            type="number" 
            min="1" 
            max={Math.max(1, students.length)} 
            value={drawCount} 
            onChange={(e) => setDrawCount(parseInt(e.target.value) || 1)}
          />
          <span>명</span>
        </div>
      </header>

      <main className="main-content">
        <section className="left-panel">
          <SlotMachine 
            students={students} 
            onComplete={handleDrawComplete} 
            drawCount={drawCount} 
          />
          
          {/* 가챠 결과 영역 - SlotMachine과 겹치거나 아래에 표시 */}
          {showBalls && (
            <div className="balls-overlay">
              <div className="gacha-balls-container">
                {results.map((name, idx) => (
                  <GachaBall key={`${name}-${idx}`} name={name} delay={idx * 800} />
                ))}
              </div>
              <button className="btn-close-balls" onClick={() => setShowBalls(false)}>
                확인
              </button>
            </div>
          )}
        </section>

        <section className="right-panel">
          <StudentManager 
            students={students}
            addStudentsBulk={addStudentsBulk}
            removeStudent={removeStudent}
            clearStudents={clearStudents}
          />
        </section>
      </main>

      <SecretModal 
        isOpen={isSecretModalOpen}
        onClose={() => setIsSecretModalOpen(false)}
        students={students}
        secretQueue={secretQueue}
        addToQueue={addToQueue}
        removeFromQueue={removeFromQueue}
      />
    </div>
  );
}

export default App;
