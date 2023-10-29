import React from 'react'
import styles from '../styles/Description.module.css';
const Label = ({content,name}) => {
  return (
      <div className={styles.label}>
          {name} : {content}
    </div>
  )
}

export default Label