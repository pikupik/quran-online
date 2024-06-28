import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SearchBar from './components/searchBar';
import SurahList from './components/surahList';
import AyahList from './components/AyahList';
import Footer from './components/Footer';

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
      <Helmet>
        <title>{selectedSurah ? `Surah ${selectedSurah}` : 'Quran Online - Baca Quran di Internet'}</title>
        <meta name="description" content={selectedSurah ? `Baca Surah ${selectedSurah} online.` : 'Baca Quran online dengan mudah di situs kami. Akses surah dan ayat Quran kapan saja dan di mana saja.'} />
        <meta name="keywords" content="Quran online, baca Quran, surah, ayat Quran, Quran di internet, Al-Quran, Islam, Muslim, tilawah Quran, membaca Al-Quran, tafsir Quran, terjemahan Quran, Al-Quran digital, Quran interaktif, belajar Quran, hafalan Quran, audio Quran, Quran MP3, belajar mengaji, Quran harian, Quran online gratis, akses Quran, situs Quran, aplikasi Quran, Quran bahasa Indonesia, Al-Quran bahasa Inggris, surah Al-Fatihah, surah Al-Baqarah, ayat suci, ayat harian, download Quran, Quran untuk anak, Quran Ramadan, Quran untuk remaja, Quran online terbaik, ayat motivasi, Al-Quran untuk pemula, membaca Quran online, mushaf digital, belajar tajwid, belajar tahsin, Quran untuk semua, Islamic online resources, website Islami, Quran dengan tafsir, Al-Quran online lengkap, belajar Quran dari rumah, Quran dalam jaringan, situs Al-Quran terpercaya, belajar Islam online, ayat pilihan, membaca Al-Quran dengan mudah, Quran aplikasi terbaik, pelajaran Quran harian, belajar Quran online gratis, belajar mengaji untuk pemula, Al-Quran lengkap dengan tafsir, Al-Quran dengan transliterasi, pengajaran Quran interaktif, hafalan ayat Quran, membaca surah pendek, pelajaran agama Islam, Quran untuk keluarga, Quran untuk anak-anak, Quran dengan suara, situs Quran mudah diakses, Al-Quran online terpercaya, belajar Islam dari rumah, Al-Quran bahasa Arab, Al-Quran terjemahan bahasa Indonesia, aplikasi mengaji online, Quran digital interaktif, belajar Quran sesuai sunnah, Quran online interaktif, aplikasi Quran gratis, Quran mudah diakses, situs pendidikan Islam, Quran pendidikan, belajar Quran interaktif, belajar mengaji online, Quran dengan tafsir lengkap, Al-Quran digital modern, Quran harian untuk semua, pelajaran Quran setiap hari, Quran mudah dipelajari, website Quran terbaik, belajar tajwid online, aplikasi belajar mengaji, Quran untuk segala usia" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <h1>Quran Online</h1>
      {selectedSurah ? (
        <AyahList surahNumber={selectedSurah} onBack={handleBack} />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <SurahList surahs={filteredSurahs} onSelect={handleSelectSurah} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
