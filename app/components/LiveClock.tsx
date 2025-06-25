'use client';
import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null; 

  return (
    <div style={{
      color: '#f6eaea',
      margin: '1rem 0',
      fontSize: '1rem',
      textAlign: 'left'
    }}>
      {now.toLocaleString()}
    </div>
  );
}