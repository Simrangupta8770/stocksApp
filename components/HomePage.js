import React, { useState } from 'react';
import GainerLoserArea from './GainerLoserArea';
import ProductPage from './ProductPage';
const HomePage = () => {
    const [expandProd, setExpandProd] = useState(false);
    const [tic, setTic] = useState("");
    const [price, setPrice] = useState("");
    const [per, setPer] = useState("");
    const handleComponentClick = (componentName,comprice,comper) => {
        setExpandProd(true);
        setTic(componentName);
        setPrice(comprice);
        setPer(comper);
      }
  return (
      <div>
          {expandProd ?
              <ProductPage pname={tic} price={price} per={per}  /> :
              <GainerLoserArea onComponentClick={handleComponentClick} />
          }
    </div>
  )
}

export default HomePage