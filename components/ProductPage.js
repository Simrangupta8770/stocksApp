import React, { useState,useEffect } from 'react'
import Layout from './Layout';
import GraphStock from './GraphStock';
import CompanyTitle from './CompanyTitle';
import Description from './Description';
const ProductPage = ({ pname,price,per }) => {
  const API_URL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${pname}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;
  const [data, setData] = useState();
  useEffect(() => {
    // Fetch data from an API
    const cachedData = localStorage.getItem(pname);
    const expirationTime = localStorage.getItem(`${pname}cachedDataProdExpiry`);
    console.log(cachedData);
    if (cachedData && new Date().getTime() < expirationTime) {
        // Use cached data if it's not expired
      setData(JSON.parse(cachedData));
      
       
    } else {
      fetchData();
      localStorage.setItem('product', JSON.stringify(data));
      const expiration = new Date().getTime() + 3600 * 1000; // 1 hour
      localStorage.setItem('cachedDataProdExpiry', expiration);
    }
   
    
    
      
  }, []);
const fetchData = async () => {
    
    await fetch(API_URL)
    .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
      
}
  return (
    <Layout>
      {/* <CompanyTitle name={pname} price={price} per={per} company={data.Name} asset={data.AssetType} exc={data.Exchange} /> */}
      {data && <CompanyTitle name={pname} price={price} per={per} data={data} company={data.Name} asset={data.AssetType} exc={data.Exchange} />}
      <GraphStock name={pname} />
      {data && <Description data={data} price={price} />
}    </Layout>
  )
}

export default ProductPage;