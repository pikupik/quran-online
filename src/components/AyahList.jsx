import React, { useEffect, useState } from 'react';

const AyahList = ({ surahNumber, onBack }) => {
  const [ayahs, setAyahs] = useState([]);
  const [surahName, setSurahName] = useState('');
  const [ayahCount, setAyahCount] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.transliteration`)
      .then(response => response.json())
      .then(data => {
        const ayahData = data.data[0].ayahs.map((ayah, index) => ({
          arabic: ayah.text,
          latin: data.data[1].ayahs[index].text,
        }));
        setAyahs(ayahData);
        setSurahName(data.data[0].englishName); // Set the Surah name
        setAyahCount(data.data[0].ayahs.length); // Set the Ayah count
        setLoading(false);
      });
  }, [surahNumber]);

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>Back</button>
      <h2>Surah: {surahName}</h2>
      <p>Jumlah Ayat: {loading ? 'Loading' : ayahCount}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        ayahs.map((ayah, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <p><strong>Ayat {index + 1}</strong></p>
            <p><strong>{ayah.arabic}</strong></p>
            <p>{ayah.latin}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AyahList;
