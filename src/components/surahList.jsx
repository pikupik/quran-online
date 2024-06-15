import React from 'react';
import SurahItem from './surahItem';

const SurahList = ({ surahs, onSelect }) => {
  return (
    <div>
      {surahs.map((surah) => (
        <SurahItem key={surah.number} surah={surah} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default SurahList;
