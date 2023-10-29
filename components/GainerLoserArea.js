import React,{useEffect, useState} from 'react';
import Layout from './Layout';
import GainersCard from './GainersCard';
import { BsCaretDown } from 'react-icons/bs';
import styles from '../styles/Card.module.css';
const API_URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;
export default function GainerLoserArea({onComponentClick}){
    const [activeTab, setActiveTab] = useState(1);
    const [initialData, setInitialData] = useState();
    const [topg, setTopg] = useState([]); 
    const [topl, setTopl] = useState([]);   
    const [showLoadMoreg, setShowLoadMoreg] = useState(true);
    const [showLoadMorel, setShowLoadMorel] = useState(true);
    useEffect(() => {
        // Fetch data from an API
        const cachedData = localStorage.getItem('cachedData');
    const expirationTime = localStorage.getItem('cachedDataExpiry');

        if (cachedData && new Date().getTime() < expirationTime) {
            // Use cached data if it's not expired
            setInitialData(JSON.parse(cachedData))
            setData(JSON.parse(cachedData));
        } else {
            fetchData();
        }
       
        
        
          
      }, []);
    const fetchData = async () => {
        
        await fetch(API_URL)
        .then((response) => response.json())
          .then((data) => {
              setInitialData(data);
              setData(data);
          });
          
    }
    const setData =(data) => {
        localStorage.setItem('cachedData', JSON.stringify(data));
        const expiration = new Date().getTime() + 3600 * 1000; // 1 hour
        localStorage.setItem('cachedDataExpiry', expiration);
        if(showLoadMoreg){
            setTopg(data.top_gainers.slice(0, 10))
        }
        if(showLoadMorel){
            setTopl(data.top_losers.slice(0, 10))
          }
        
    }
   
    const loadMore = async (ch) => {
      try {
        if (ch == 'g') {
          const moreData = initialData.top_gainers.slice(10, 20);
          setTopg([...topg, ...moreData]);
          setShowLoadMoreg(false);
        } else {
          const moreData = initialData.top_losers.slice(11, 20);
          setTopl([...topl, ...moreData]);
          setShowLoadMorel(false);
        }
       
      
       
          
        
      } catch (error) {
        console.error('Error fetching more data:', error);
      }
    };
  const handleComponentClick = (componentName,componentPrice,componentPer) => {
    onComponentClick(componentName,componentPrice,componentPer);
    } 
    const handleTabClick = (tabNumber) => {
      console.log("jdb");
      setActiveTab(tabNumber);
    };
    return (
        <Layout>
       
          
        <div className={styles.tabButtons}>
          <button
            className={activeTab === 1 ? styles.active : ''}
            onClick={() => handleTabClick(1)}
          >
            Top Gainers
          </button>
          <button
            className={activeTab === 2 ? styles.active : ''}
            onClick={() => handleTabClick(2)}
          >
           Top Losers
          </button>
         
        </div>
  
        <div className={styles.tabContent}>
                {activeTab === 1 && <div className={styles.fullPage}>
                    <div className={styles.cardArea}>
            {topg.map((val) => <GainersCard data={val} key={val.ticker} color="green" onClick={()=>handleComponentClick(val.ticker,val.price,val.change_percentage)} />)}
            </div>
                        {showLoadMoreg && <button className={styles.load} onClick={() => loadMore('g')}>
          Load More <BsCaretDown />
      </button>}</div>}
                {activeTab === 2 && <div className={styles.fullPage}>
                    <div className={styles.cardArea}>
            {topl.map((val) => <GainersCard data={val} key={val.ticker} color="red" onClick={()=>handleComponentClick(val.ticker) } />)}
            </div>
                        {showLoadMorel && <button className={styles.load} onClick={() => loadMore('l')}>
          Load More <BsCaretDown />
      </button>}
      </div>}
        
        </div>



        </Layout>
    
    );
}


  export async function fetchData() {
    try {
     
      const response = await fetch(API_URL);
  
     
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      console.log(response);
     
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }

