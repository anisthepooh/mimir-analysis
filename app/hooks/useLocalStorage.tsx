'use client';
import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: any) {
  // Initialize the state from localStorage or use the initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error reading localStorage", error);
        return initialValue;
      }
    }
    return initialValue; // Fallback for server-side rendering
  });

  // Update localStorage whenever the state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
