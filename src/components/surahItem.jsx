import React from 'react';

const SurahItem = ({ surah, onSelect }) => {
  return (
    <div 
      style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', cursor: 'pointer' }}
      onClick={() => onSelect(surah.number)}
    >
      <h3>{surah.englishName} ({surah.name})</h3>
      <p>{surah.englishNameTranslation}</p>
    </div>
  );
};

export default SurahItem;
