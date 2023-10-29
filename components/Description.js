import React from 'react'
import styles from '../styles/Description.module.css';
import Label from './Label';
const Description = ({data,price}) => {
    return (
      <div className={styles.box}>
      <div class={styles.desc}>
          <h4>
              About {data.Name}
          </h4>
                <div className={styles.description}>
              {data.Description}
          </div>
                <div className={styles.labels}>
              <Label name="Sector" content={data.Sector} />
              <Label name="Industry" content={data.Industry} />
          </div>
          <div className={styles.priceRangeLine}>
              <div className={styles.priceRangeLabel}>Low: {data["52WeekLow"]}</div>
              <div className={styles.priceRangeCurrent}>Current: {price}</div>
              <div className={styles.priceRangeLabel}>High: {data["52WeekHigh"]}</div>
                </div>
                

            </div>
            </div>
  )
}

export default Description