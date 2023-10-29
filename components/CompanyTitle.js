import React from 'react';
import { FaPlay } from 'react-icons/fa';
import styles from '../styles/Company.module.css';
const CompanyTitle = ({name,price,per,company,asset,exc}) => {
  return (
      <div className={styles.titleHead}>
          <div className={styles.titleLeft}>
              <h2>{company}</h2>
              <h4>{name} , {asset}</h4>
              <h4>{exc}</h4>
          </div>
          <div className={styles.titleRight}>
            <div className={styles.cardPrice}>
                $ {price}
            </div>
            <div className={styles.cardPer}>
                + {per}   
                <FaPlay className={styles.icon} size={12} color="green" />

                </div>
          </div>
          
    </div>
  )
}

export default CompanyTitle