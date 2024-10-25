import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <header className={styles.searchBar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <span className={styles.icon} onClick={handleSubmit}>
          🔍 
        </span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search images and photos"
          className={styles.input}
        />
      </form>
    </header>
  );
};

export default SearchBar;
