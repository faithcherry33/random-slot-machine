import { useState, useEffect } from 'react';

export function useSecretQueue() {
  const [secretQueue, setSecretQueue] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('random-slot-secret-queue');
    if (saved) {
      try {
        setSecretQueue(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse secret queue from local storage', e);
      }
    }
  }, []);

  const updateQueue = (newQueue) => {
    // 빈 문자열 제거
    const filtered = newQueue.map(s => s.trim()).filter(s => s);
    setSecretQueue(filtered);
    localStorage.setItem('random-slot-secret-queue', JSON.stringify(filtered));
  };

  const addToQueue = (name) => {
    if (name && name.trim()) {
      updateQueue([...secretQueue, name]);
    }
  };

  const removeFromQueue = (index) => {
    const newQueue = [...secretQueue];
    newQueue.splice(index, 1);
    updateQueue(newQueue);
  };

  // 큐에서 다음 N명을 가져오고 큐에서 제거 (결과 반환)
  const popFromQueue = (count) => {
    const popped = secretQueue.slice(0, count);
    const remaining = secretQueue.slice(count);
    updateQueue(remaining);
    return popped;
  };

  return {
    secretQueue,
    updateQueue,
    addToQueue,
    removeFromQueue,
    popFromQueue
  };
}
