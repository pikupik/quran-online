import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar';
import SurahList from './components/surahList';
import AyahList from './components/AyahList';

const App = () => {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(response => response.json())
      .then(data => {
        setSurahs(data.data);
        setFilteredSurahs(data.data);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = surahs.filter(surah => 
      surah.englishName.toLowerCase().includes(query.toLowerCase()) ||
      surah.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSurahs(filtered);
  };

  const handleSelectSurah = (surahNumber) => {
    setSelectedSurah(surahNumber);
  };

  const handleBack = () => {
    setSelectedSurah(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Quran Online</h1>
      {selectedSurah ? (
        <AyahList surahNumber={selectedSurah} onBack={handleBack} />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <SurahList surahs={filteredSurahs} onSelect={handleSelectSurah} />
        </>
      )}
    </div>
  );
};

export default App;
