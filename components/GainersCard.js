import React from 'react';
import styles from '../styles/Card.module.css';
import { FaPlay } from 'react-icons/fa';

const GainersCard = ({ data, onClick, color }) => {
  const cardStyle = {
    color: color,
  }
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardHead}>
        {data.ticker}
      </div>
      <div className={styles.cardPrice}>
        $ {data.price}
      </div>
      <div className={styles.cardPer} style={cardStyle}>
        {color==="red" ? '-':'+'} {data.change_percentage}   
        <FaPlay className={styles.icon} size={12} color={color} />

        </div>
    </div>
  );
};

export default GainersCard;