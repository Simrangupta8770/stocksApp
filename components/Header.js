import React,{useState,useEffect} from 'react';
import styles from '../styles/Header.module.css';
import { FaSearch } from 'react-icons/fa';
const Header = () => {
  const [searchInput, setSearchInput] = useState("tesco");
  
  const API_URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchInput}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;
   const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterOption, setFilterOption] = useState('All');
  useEffect(() => {
    fetchData()
  }, [searchInput]); 

  useEffect(() => {
    filterData();
  }, [filterOption]);
  const filterData = () => {
    const fr = searchResults.filter((stock) => {
      if (filterOption === 'All') {
        return true; // Show all results
      } else if (filterOption === 'Stocks') {

        return stock['3. type'] === 'Equity';
      } else if (filterOption === 'ETFs') {
        return stock['3. type'] === 'ETF';
      }
      return true;
    });
    setFilteredResults(fr);
  }
  const fetchData = async () => {
                                      
    await fetch(API_URL)
    .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.bestMatches);
        
        setFilteredResults(searchResults);
      });
      
  }
  const handleFocus = async() => {
   
      setShowSearchResults(true);
    
  };

  const handleBlur = () => {
    setShowSearchResults(false);
  };
    const handleSearch = (e) => {
        // console.log(e.target.value);
        setSearchInput(e.target.value);
  }
  const handleFilterChange = (option) => {
    setFilterOption(option);
    setShowSearchResults(true);
  };
    
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <h2>GrowwStocks</h2>
        </div>
          <div className={styles.searchBar}>
        <button type="submit" className={styles.searchIco}><FaSearch /></button>

        <div className={styles.search}>
            <input type="text" className={styles.searchInp} value={searchInput} onChange={handleSearch} onFocus={handleFocus}
        onBlur={handleBlur}/>
        <div className={styles.filterOptions}>
        <label className={styles.labelSwitch}>
          <input
            type="radio"
            name="filter"
                value="All"
                className={styles.inputSwitch}
            checked={filterOption === 'All'}
            onChange={() => handleFilterChange('All')}
          />
          All
        </label>
        <label className={styles.labelSwitch}>
          <input
            type="radio"
            name="filter"
                value="Stocks"
                 className={styles.inputSwitch}
            checked={filterOption === 'Stocks'}
            onChange={() => handleFilterChange('Stocks')}
          />
          Stocks
        </label>
        <label className={styles.labelSwitch}>
          <input
            type="radio"
            name="filter"
                value="ETFs"
                className={styles.inputSwitch}
            checked={filterOption === 'ETFs'}
            onChange={() => handleFilterChange('ETFs')}
          />
          ETFs
        </label>
      </div>
      
            {showSearchResults && filteredResults.length > 0 && (
              <ul>
                {filteredResults.map((stock) => (
                  <li key={stock['1. symbol']}>
                    <div>{stock['2. name']}</div>
                    <div>{stock['1. symbol']}</div>
                  </li>
                ))}
              </ul>
            )}
            
          </div>
        </div>
    </div>
  )
}

export default Header;