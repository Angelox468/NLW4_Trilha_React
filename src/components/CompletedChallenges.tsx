import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengsContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallanges (){
  const {challangesCompleted} = useContext(ChallengesContext);

  return(
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challangesCompleted}</span>
    </div>
  );
}