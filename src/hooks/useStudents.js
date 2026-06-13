import { useState, useEffect } from 'react';

export function useStudents() {
  const [students, setStudents] = useState([]);

  // 로컬 스토리지에서 학생 명단 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('random-slot-students');
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse students from local storage', e);
      }
    }
  }, []);

  // 학생 명단 업데이트 시 로컬 스토리지에 저장
  const updateStudents = (newStudents) => {
    // 중복 제거 및 빈 문자열 제거
    const filtered = Array.from(new Set(newStudents.map(s => s.trim()).filter(s => s)));
    setStudents(filtered);
    localStorage.setItem('random-slot-students', JSON.stringify(filtered));
  };

  const addStudentsBulk = (text) => {
    // 쉼표나 줄바꿈으로 분리
    const names = text.split(/[,\n]/);
    updateStudents([...students, ...names]);
  };

  const removeStudent = (name) => {
    updateStudents(students.filter(s => s !== name));
  };
  
  const clearStudents = () => {
    updateStudents([]);
  };

  return {
    students,
    updateStudents,
    addStudentsBulk,
    removeStudent,
    clearStudents
  };
}
