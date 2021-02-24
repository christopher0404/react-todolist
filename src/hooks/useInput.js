import { useState } from 'react';

export default function useInput() {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => setInputValue(event.target.value);

  return {
    inputValue,
    setInputValue,
    handleInputChange,
  };
}
