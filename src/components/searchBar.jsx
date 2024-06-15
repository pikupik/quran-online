import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input 
      type="text" 
      placeholder="Cari surat..." 
      onChange={(e) => onSearch(e.target.value)} 
      style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
    />
  );
};

export default SearchBar;
