import React, { useState, useEffect } from 'react';
import './App.css';

const COINCAP_API_KEY = '2f2eaacb-0b1c-48fb-9a43-fd7fd78d3b29';
const COINCAP_API_URL = `https://api.coincap.io/v2`;

const App = () => {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(`${COINCAP_API_URL}/assets?limit=10`, {
          headers: {
            'Authorization': `Bearer ${COINCAP_API_KEY}`
          }
        });
        const { data } = await response.json();
        setCryptos(data);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      }
    };

    fetchCryptos();
  }, []);

  useEffect(() => {
    setFilteredCryptos(
      cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [cryptos, search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Kryptoměny</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Hledej kryptoměnu"
          onChange={handleChange}
        />
      </div>
      <table className="crypto-table">
        <thead>
          <tr>
            <th><b>Název</b></th>
            <th>Symbol</th>
            <th>Cena (USD)</th>
            <th>Tržní kapitalizace (USD)</th>
            <th>Změna ceny (24h)</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td><b>{crypto.name}</b></td>
              <td>{crypto.symbol}</td>
              <td>{parseFloat(crypto.priceUsd).toFixed(2)}</td>
              <td>{parseFloat(crypto.marketCapUsd).toFixed(2)}</td>
              <td>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
