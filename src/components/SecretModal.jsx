import { useState, useEffect } from 'react';
import { Settings, Plus, X } from 'lucide-react';
import './SecretModal.css';

export default function SecretModal({ isOpen, onClose, students, secretQueue, addToQueue, removeFromQueue }) {
  const [selectedStudent, setSelectedStudent] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (selectedStudent) {
      addToQueue(selectedStudent);
      setSelectedStudent('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="secret-modal glass-panel">
        <div className="modal-header">
          <div className="title">
            <Settings className="icon" />
            <h2>시크릿 큐 설정 (교사용)</h2>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="queue-input">
            <select 
              value={selectedStudent} 
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">다음에 무조건 당첨시킬 학생 선택</option>
              {students.map((student, idx) => (
                <option key={idx} value={student}>{student}</option>
              ))}
            </select>
            <button className="btn-add-queue" onClick={handleAdd}>
              <Plus size={18} />
              추가
            </button>
          </div>

          <div className="queue-list-container">
            <h3>대기 중인 시크릿 큐</h3>
            <p className="hint">아래 순서대로 무조건 당첨됩니다. 큐가 비어있으면 랜덤으로 추첨됩니다.</p>
            
            <div className="queue-list">
              {secretQueue.length === 0 ? (
                <div className="empty-queue">대기열이 비어있습니다</div>
              ) : (
                secretQueue.map((student, idx) => (
                  <div key={`${student}-${idx}`} className="queue-item">
                    <span className="queue-number">{idx + 1}</span>
                    <span className="queue-name">{student}</span>
                    <button className="btn-remove-queue" onClick={() => removeFromQueue(idx)}>
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
