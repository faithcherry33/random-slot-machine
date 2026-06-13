import { useState } from 'react';
import { Users, UserPlus, Trash2, X } from 'lucide-react';
import './StudentManager.css';

export default function StudentManager({ students, addStudentsBulk, removeStudent, clearStudents }) {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim()) {
      addStudentsBulk(inputText);
      setInputText('');
    }
  };

  return (
    <div className="student-manager glass-panel">
      <div className="header">
        <Users className="icon" />
        <h2>학생 명단 관리 ({students.length}명)</h2>
      </div>
      
      <div className="input-group">
        <textarea 
          placeholder="이름을 쉼표(,)나 줄바꿈으로 구분해서 입력하세요&#10;예: 홍길동, 김철수, 이영희"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={3}
        />
        <button className="btn-add" onClick={handleAdd}>
          <UserPlus size={18} />
          추가하기
        </button>
      </div>

      <div className="list-header">
        <h3>등록된 명단</h3>
        {students.length > 0 && (
          <button className="btn-clear" onClick={clearStudents}>
            <Trash2 size={16} />
            전체 삭제
          </button>
        )}
      </div>

      <div className="student-list">
        {students.length === 0 ? (
          <div className="empty-state">학생을 추가해주세요</div>
        ) : (
          students.map((student, idx) => (
            <div key={`${student}-${idx}`} className="student-tag">
              <span>{student}</span>
              <button className="btn-remove" onClick={() => removeStudent(student)}>
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
