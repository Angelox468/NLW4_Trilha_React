import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengsContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const {level} = useContext(ChallengesContext);

  return (
    <div className ={styles.profileContainer}>
      <img src="https://github.com/Angelox468.png" alt="Angelo Ricardo"/>
      <div>
        <strong> Angelo Ricardo</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>

  );
}